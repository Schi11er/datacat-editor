import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Autocomplete,
  Box,
  Chip,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormSet, { FormSetTitle } from "./FormSet";
import { ifcClasses, IfcClass } from "../../constants/IfcClasses";

export type IfcReference = {
  uri: string;
  code: string;
};

type IfcReferenceFormProps = {
  references?: IfcReference[];
  onChange?: (references: IfcReference[]) => void;
};


export default function IfcReferenceForm({
  references,
  onChange,
}: IfcReferenceFormProps) {
  const [selected, setSelected] = useState<IfcReference[]>(references ?? []);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (references !== undefined) setSelected(references);
  }, [references]);

  const updateSelected = (next: IfcReference[]) => {
    setSelected(next);
    onChange?.(next);
  };

  return (
    <FormSet>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <FormSetTitle>
          <b>Ifc-Referenzklassen</b>
        </FormSetTitle>
        <IconButton
          aria-label="Ifc-Referenzklasse hinzufügen"
          onClick={() => setOpen(true)}
          size="small"
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {selected.map((reference) => (
          <Chip
            key={reference.uri}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {reference.code}
                <a
                  href={reference.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "inherit",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  <OpenInNewIcon fontSize="small" color="primary" />
                </a>
              </Box>
            }
            title={reference.uri}
            onDelete={() =>
              updateSelected(selected.filter((item) => item.uri !== reference.uri))
            }
            deleteIcon={<DeleteIcon />}
          />
        ))}
      </Box>

      {open && (
        <Autocomplete
          autoHighlight
          open
          onClose={() => setOpen(false)}
          options={ifcClasses.filter(
            (option) => !selected.some((item) => item.uri === option.uri),
          )}
          value={null}
          inputValue={inputValue}
          onInputChange={(_, value) => setInputValue(value)}
          onChange={(_, value: IfcClass | null) => {
            if (value) {
              updateSelected([
                ...selected,
                { code: value.code, uri: value.uri },
              ]);
              setInputValue("");
            }
          }}
          getOptionLabel={(option) => option.code}
          isOptionEqualToValue={(option, value) => option.uri === value.uri}
          noOptionsText="Keine Treffer"
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              label="Ifc-Klasse suchen"
              placeholder="Ifc-Code"
            />
          )}
        />
      )}
    </FormSet>
  );
}
