import React, { FC, useState } from "react";
import { Autocomplete } from "@mui/material";
import { useQuery } from "@apollo/client/react";
import { DictionaryPropsFragment, FindDictionariesDocument } from "../../generated/graphql";
import { TextField, TextFieldProps } from "@mui/material";
import { defaultFormFieldOptions } from "../../hooks/useFormStyles";
import CircularProgress from "@mui/material/CircularProgress";

type DictionaryOption = Pick<DictionaryPropsFragment, "id" | "name" | "tags">;

type DictionarySelectFieldProps = {
    onChange(value: DictionaryOption | null): void,
    TextFieldProps: TextFieldProps
}

// const sortByName = ({ name: a }: DictionaryPropsFragment, { name: b }: DictionaryPropsFragment) => {
//     return a.localeCompare(b);
// };

const DictionarySelectField: FC<DictionarySelectFieldProps> = (props) => {
    const {
        onChange,
        TextFieldProps
    } = props;
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = useState('');
    const { loading, data, error } = useQuery(FindDictionariesDocument, {
        fetchPolicy: "cache-and-network",
        variables: {
            input: { query, pageSize: 500 }
        }
    });

    const options = data?.findDictionaries?.nodes ?? [];
    // options.sort(sortByName);

    const defaultDictionary = options[0];

    const [selectedDictionary, setSelectedDictionary] = useState<DictionaryOption | null>(null);

    React.useEffect(() => {
        if (!selectedDictionary && defaultDictionary) {
            setSelectedDictionary(defaultDictionary);
            onChange(defaultDictionary);
        }
    }, [defaultDictionary]);

    return (
        <Autocomplete<DictionaryOption, false, false, false>
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={selectedDictionary}
            onChange={(event, value) => onChange(value)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => {
                const deText = option.name.texts?.find(t => t.language.code === "de");
                return deText?.text || option.name.texts?.[0]?.text || option.id;
            }}
            onInputChange={(event, value) => setQuery(value)}
            filterSelectedOptions={false}
            filterOptions={(options) => options}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    id={params.id}
                    disabled={params.disabled}
                    fullWidth={params.fullWidth}
                    size={params.size}
                    {...defaultFormFieldOptions}
                    {...TextFieldProps}
                    slotProps={{
                        input: {
                            ...params.slotProps.input,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.slotProps.input.endAdornment}
                                </React.Fragment>
                            ),
                        },
                        htmlInput: params.slotProps.htmlInput,
                    }}
                />
            )}
        />
    );
}

export default DictionarySelectField;
