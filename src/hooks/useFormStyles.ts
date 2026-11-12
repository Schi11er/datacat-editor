import {TextFieldProps} from "@mui/material/TextField";

// Export the default field options
export const defaultFormFieldOptions: TextFieldProps = {
    autoComplete: "off",
    fullWidth: true,
    size: "small",
    variant: "outlined" as const,
};
