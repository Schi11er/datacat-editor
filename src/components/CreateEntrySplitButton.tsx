import React, {FC, useState} from "react";
import {EntryType, PropertyTreeDocument, useCreateEntryMutation} from "../generated/types";
import {ButtonGroup, ButtonGroupProps, Dialog} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CreateEntryForm, {CreateEntryFormValues} from "./forms/CreateEntryForm";
import {Maybe} from "graphql/jsutils/Maybe";
import {useSnackbar} from "notistack";
import {
    ClassEntity,
    DocumentEntity,
    Entity,
    GroupEntity,
    ModelEntity,
    PropertyEntity,
    PropertyGroupEntity
} from "../domain";
import {dispatch, EventAction} from 'use-bus';

export type NewEntryAction = {
    entryType: EntryType
    id: string
} & EventAction


type CreateEntrySplitButtonProps = {
    ButtonGroupProps?: ButtonGroupProps
}

const options = [
    DocumentEntity,
    ModelEntity,
    GroupEntity,
    ClassEntity,
    PropertyGroupEntity,
    PropertyEntity,
];


const CreateEntrySplitButton: FC<CreateEntrySplitButtonProps> = (props) => {
    const {
        ButtonGroupProps
    } = props;

    const {enqueueSnackbar} = useSnackbar();

    const [create] = useCreateEntryMutation({
        refetchQueries: [
            {query: PropertyTreeDocument}
        ]
    });

    const [lastUsedOption, setLastUsedOption] = React.useState(ClassEntity);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const [input, setInput] = React.useState<Maybe<Entity>>(null);

    const defaultValues: CreateEntryFormValues = {
        id: "",
        name: "",
        description: "",
        versionId: "",
        versionDate: ""
    };

    const onClick = (tag: Entity) => {
        setMenuOpen(false);
        setLastUsedOption(tag);
        setInput(tag);
        setDialogOpen(true);
    }

    const handleToggle = () => {
        setMenuOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setMenuOpen(false);
    };

    const onSubmit = async ({id, versionId, versionDate, name, description}: CreateEntryFormValues) => {
        const entryType = input?.entryType!;
        const names = [
            {languageTag: "de", value: name}
        ];
        const descriptions = description
            ? [{languageTag: "de", value: description}]
            : [];
        const version = {versionId, versionDate};
        const properties = {
            id,
            version: version,
            names: names,
            descriptions
        };
        const {data} = await create({
            variables: {
                input: {
                    entryType,
                    properties: properties,
                    tags: input?.tags!
                }
            }
        });

        // TODO: Add error handling to give feedback in forms

        setDialogOpen(false);
        enqueueSnackbar(`${input!.title} erstellt.`);

        const newId = data?.createEntry?.entry?.id;
        dispatch({type: `new/entry`, entryType: input!.entryType, id: newId});
    };

    return (
        <React.Fragment>
            <ButtonGroup
                variant="outlined"
                color="inherit" {...ButtonGroupProps}
                ref={anchorRef}
                aria-label="Eintrag hinzufügen"
            >
                <Button onClick={() => onClick(lastUsedOption)} startIcon={<AddIcon/>}>{lastUsedOption.title} hinzufügen</Button>
                <Button
                    color="inherit"
                    aria-controls={menuOpen ? 'split-button-menu' : undefined}
                    aria-expanded={menuOpen ? 'true' : undefined}
                    aria-label="Zeige weitere Optionen"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon/>
                </Button>
            </ButtonGroup>

            <Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.filter(entityType => entityType !== lastUsedOption).map(option => (
                                        <MenuItem onClick={() => onClick(option)}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{input?.title} erstellen...</DialogTitle>
                <DialogContent>
                    <CreateEntryForm
                        defaultValues={defaultValues}
                        onSubmit={onSubmit}
                    />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );

}

export default CreateEntrySplitButton;
