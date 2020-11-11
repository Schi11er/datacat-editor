import React, {FC} from "react";
import {
    AssignsCollectionsPropsFragment,
    AssignsPropertiesPropsFragment,
    EntityTypes,
    GetObjectEntryDocument,
    ObjectDetailPropsFragment,
    PropertyTreeDocument,
    useDeleteEntryMutation,
    useGetObjectEntryQuery
} from "../../generated/types";
import {Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {FormSet} from "../../components/forms/FormSet";
import MetaFormSet from "../../components/forms/MetaFormSet";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NameFormSet from "../../components/forms/NameFormSet";
import DescriptionFormSet from "../../components/forms/DescriptionFormSet";
import VersionFormSet from "../../components/forms/VersionFormSet";
import useAssignsCollections from "../../hooks/useAssignsCollections";
import useAssignsProperties from "../../hooks/useAssignsProperties";
import {PropertyGroupEntity} from "../../domain";
import FormView, {FormProps} from "./FormView";
import useDocumentedBy from "../../hooks/useDocumentedBy";
import useCollectedBy from "../../hooks/useCollectedBy";

const DomainClassForm: FC<FormProps<ObjectDetailPropsFragment>> = (props) => {
    const {id, onDelete} = props;
    const {enqueueSnackbar} = useSnackbar();

    const baseOptions = {
        refetchQueries: [{query: PropertyTreeDocument}]
    };

    // fetch domain model
    const {loading, error, data} = useGetObjectEntryQuery({
        fetchPolicy: "network-only",
        variables: {id}
    });
    let entry = data?.node as ObjectDetailPropsFragment | undefined;
    const [deleteEntry] = useDeleteEntryMutation(baseOptions);

    const assignedCollections = useAssignsCollections({
        id,
        relationships: entry?.assignedCollections.nodes || [],
        optionsSearchInput: {
            pageSize: 100,
            tagged: PropertyGroupEntity.tags
        },
        renderLabel(relationship?: AssignsCollectionsPropsFragment): React.ReactNode {
            return relationship ? `Merkmalsgruppen (${relationship.id})` : `Merkmalsgruppen`;
        },
        refetchQueries: [
            {query: PropertyTreeDocument},
            {query: GetObjectEntryDocument, variables: {id}}
        ]
    });

    const assignedProperties = useAssignsProperties({
        id,
        relationships: entry?.assignedProperties.nodes || [],
        optionsSearchInput: {
            pageSize: 100,
            entityTypeIn: [EntityTypes.XtdProperty]
        },
        renderLabel(relationship?: AssignsPropertiesPropsFragment): React.ReactNode {
            return relationship ? `Merkmale (${relationship.id})` : `Merkmale`;
        },
        refetchQueries: [
            {query: PropertyTreeDocument},
            {query: GetObjectEntryDocument, variables: {id}}
        ]
    });

    const documentedBy = useDocumentedBy({
        relationships: entry?.documentedBy.nodes ?? []
    });

    const collectedBy = useCollectedBy({
        relationships: entry?.collectedBy.nodes ?? [],
        emptyMessage: "Klasse wird in keiner Gruppe genutzt."
    })


    if (loading) return <Typography>Lade Klasse..</Typography>;
    if (error || !entry) return <Typography>Es ist ein Fehler aufgetreten..</Typography>;

    const handleOnDelete = async () => {
        await deleteEntry({variables: {id}});
        enqueueSnackbar("Klasse gelöscht.")
        onDelete(entry!);
    };

    return (
        <FormView>
            <NameFormSet
                entryId={id}
                names={entry.names}
            />

            <DescriptionFormSet
                entryId={id}
                descriptions={entry.descriptions}
            />

            <VersionFormSet
                id={id}
                versionId={entry.versionId}
                versionDate={entry.versionDate}
            />

            <FormSet
                title="Merkmalsgruppen"
                description="Merkmalsgruppen, die dieser Klasse zugeordnet sind."
            >
                {assignedCollections}
            </FormSet>

            <FormSet
                title="Merkmale"
                description="Merkmale, die dieser Klasse direkt zugeordnet sind."
            >
                {assignedProperties}
            </FormSet>

            <MetaFormSet entry={entry}>
                <FormSet title="Referenzen..." description="">
                    {documentedBy}
                </FormSet>

                <FormSet title="Gruppen...">
                    {collectedBy}
                </FormSet>
            </MetaFormSet>

            <Button
                variant="contained"
                color="primary"
                startIcon={<DeleteForeverIcon/>}
                onClick={handleOnDelete}
            >
                Löschen
            </Button>
        </FormView>
    );
}

export default DomainClassForm;
