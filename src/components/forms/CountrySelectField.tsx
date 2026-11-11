import React, { FC, useState, useMemo, useCallback } from "react";
import { Autocomplete } from "@mui/material";
import { useQuery } from "@apollo/client/react";
import {
    FindCountriesDocument,
    FindCountriesQuery,
} from "../../generated/graphql";
import { TextField, TextFieldProps } from "@mui/material";
import { defaultFormFieldOptions } from "../../hooks/useFormStyles";
import CircularProgress from "@mui/material/CircularProgress";
import useDebounce from "../../hooks/useDebounce";

type CountryOption = FindCountriesQuery["findCountries"]["nodes"][number];

type CountrySelectFieldProps = {
    filter?: string[],
    onChange(value: CountryOption | null): void,
    TextFieldProps: TextFieldProps,
    // Neue optionale Props für erweiterte Features
    preloadData?: boolean,
    showPopularCountries?: boolean,
    debounceDelay?: number,
    // Optionaler initialer Wert
    initialValue?: CountryOption | null,
    // Optionales Deaktivieren des Auto-Default
    autoSelectDefault?: boolean
}

const sortByName = ({ code: a }: { code: string }, { code: b }: { code: string }) => {
    return a.localeCompare(b);
};

// Beliebte Länder für schnelleren Zugriff
const POPULAR_COUNTRY_CODES = ['DE', 'US', 'GB', 'FR', 'IT', 'ES', 'NL', 'AT', 'CH'];

const CountrySelectField: FC<CountrySelectFieldProps> = (props) => {
    const {
        filter,
        onChange,
        TextFieldProps,
        preloadData = true,
        showPopularCountries = false,
        debounceDelay = 300,
        initialValue = null,
        autoSelectDefault = true
    } = props;
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = useState('');
    
    // Debounce search query to reduce API calls
    const debouncedQuery = useDebounce(query, debounceDelay);
    
    const {
        data,
        loading,
    } = useQuery(FindCountriesDocument, {
        variables: {
            input: { query: debouncedQuery, pageSize: 250 }
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: false,
        skip: !preloadData && debouncedQuery.length === 0,
    });

    // Memoize options to prevent unnecessary re-renders
    const options = useMemo(() => {
        const countries = data?.findCountries?.nodes ?? [];
        return [...countries].sort(sortByName);
    }, [data?.findCountries?.nodes]);
    // Find popular countries if enabled
    const popularCountries = useMemo(() => {
        if (!showPopularCountries) return [];
        return POPULAR_COUNTRY_CODES
            .map(code => options.find(country => country.code === code))
            .filter((country): country is NonNullable<typeof country> => Boolean(country));
    }, [options, showPopularCountries]);
    
    // Group options: popular countries first, then all others
    const groupedOptions = useMemo(() => {
        if (!showPopularCountries || query.length > 0) {
            return options;
        }
        
        const otherCountries = options.filter(
            country => !popularCountries.some(popular => popular.id === country.id)
        );
        
        return [...popularCountries, ...otherCountries];
    }, [options, popularCountries, showPopularCountries, query]);
    
    // Find default country only when options change
    const defaultCountry = useMemo(() => {
        return options.find(opt => opt.code === "DE");
    }, [options]);

    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(initialValue);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    React.useEffect(() => {
        // Nur setzen wenn Auto-Default aktiviert ist, User noch nicht interagiert hat UND kein Land ausgewählt ist
        if (autoSelectDefault && !hasUserInteracted && !selectedCountry && defaultCountry) {
            setSelectedCountry(defaultCountry);
            onChange(defaultCountry);
        }
    }, [defaultCountry, selectedCountry, onChange, hasUserInteracted, autoSelectDefault]);

    // Memoize input change handler
    const handleInputChange = useCallback((event: any, value: string) => {
        if (value.length > 0) {
            setHasUserInteracted(true); // Auch bei Eingabe als Interaktion markieren
        }
        setQuery(value);
    }, []);

    // Memoize change handler
    const handleChange = useCallback((event: any, value: CountryOption | null) => {
        setHasUserInteracted(true); // Markiere als User-Interaktion
        setSelectedCountry(value);
        onChange(value);
    }, [onChange]);

    return (
        <Autocomplete<CountryOption, false, false, false>
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={selectedCountry}
            onChange={handleChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => {
                const name =
                    typeof option.name === "string" && option.name.length > 0
                        ? option.name
                        : option.code;
                return `${name} (${option.code})`;
            }}
            onInputChange={handleInputChange}
            filterSelectedOptions={false}
            filterOptions={(options) => options} // Let backend handle filtering
            options={groupedOptions}
            loading={loading}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {`${option.name || option.code} (${option.code})`}
                </li>
            )}
            // Performance optimizations
            disableListWrap
            blurOnSelect
            clearOnBlur
            handleHomeEndKeys
            // Group popular countries (if enabled and no search)
            groupBy={showPopularCountries && query.length === 0 ? (option) => {
                const isPopular = popularCountries.some(popular => popular.id === option.id);
                return isPopular ? 'Häufig verwendet' : 'Alle Länder';
            } : undefined}
            renderInput={(params) => {
                return (
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
                );
            }}
        />
    );
}

export default CountrySelectField;
