import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useSnackbar } from "notistack";
import FormSet, { FormSetTitle } from "./FormSet";
import { ifcClasses, IfcClass } from "../../constants/IfcClasses";
import {
  CreateEntryDocument,
  CreateRelationshipDocument,
  DeleteRelationshipDocument,
  FindItemDocument,
} from "../../generated/graphql";

export type IfcReference = {
  id?: string;
  uri: string;
  code: string;
};

type IfcReferenceFormProps = {
  catalogEntryId: string;
  references?: IfcReference[];
  onChange?: () => Promise<void> | void;
};

const IFC_REFERENCE_TAG = "e7c376e9-da92-4cd9-9b28-7ae8086834fb";

export default function IfcReferenceForm({
  catalogEntryId,
  references,
  onChange,
}: IfcReferenceFormProps) {
  const [selected, setSelected] = useState<IfcReference[]>(references ?? []);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [findItems] = useLazyQuery(FindItemDocument, {
    fetchPolicy: "network-only",
  });
  const [createEntry] = useMutation(CreateEntryDocument);
  const [createRelationship] = useMutation(CreateRelationshipDocument);
  const [deleteRelationship] = useMutation(DeleteRelationshipDocument);

  useEffect(() => {
    if (references !== undefined) setSelected(references);
  }, [references]);

  const updateSelected = (next: IfcReference[]) => setSelected(next);

  const saveReference = async (reference: IfcClass) => {
    setSaving(true);
    try {
      const searchResult = await findItems({
        variables: {
          input: {
            entityTypeIn: ["Subject"],
            tagged: [IFC_REFERENCE_TAG],
            query: reference.code,
          },
          pageSize: 50,
          pageNumber: 0,
        },
      });
      const existing = searchResult.data?.search.nodes.find(
        // Because filter is set to Subject and tagged with IFC_REFERENCE_TAG, we can assume that the referenceUri exists
        (node) => node.referenceUri === reference.uri,
      );

      let referenceId = existing?.id;
      if (!referenceId) {
        const createResult = await createEntry({
          variables: {
            input: {
              catalogEntryType: "Subject",
              properties: {
                names: [{ languageTag: "de", value: reference.code }],
                referenceUri: reference.uri,
              },
              tags: [IFC_REFERENCE_TAG],
            },
          },
        });
        referenceId = createResult.data?.createCatalogEntry?.catalogEntry?.id;
      }
      if (!referenceId) {
        throw new Error("Die IFC-Referenz konnte nicht angelegt werden.");
      }

      await createRelationship({
        variables: {
          input: {
            fromId: catalogEntryId,
            toIds: [referenceId],
            relationshipType: "RelationshipToSubject",
            properties: {
              relationshipToSubjectProperties: {
                name: "hasReference",
                relationshipType: "XTD_INSTANCE_LEVEL",
              },
            },
          },
        },
      });
      setOpen(false);
      setInputValue("");
      await onChange?.();
    } catch (error) {
      console.error("IfcReferenceForm: saving reference failed", error);
      enqueueSnackbar("Die IFC-Referenz konnte nicht gespeichert werden.", {
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const removeReference = async (reference: IfcReference) => {
    if (!reference.id) return;
    setSaving(true);
    try {
      await deleteRelationship({
        variables: {
          input: {
            fromId: catalogEntryId,
            toId: reference.id,
            name: "hasReference",
            relationshipType: "RelationshipToSubject",
          },
        },
      });
      updateSelected(selected.filter((item) => item.uri !== reference.uri));
      await onChange?.();
    } catch (error) {
      console.error("IfcReferenceForm: removing reference failed", error);
      enqueueSnackbar("Die IFC-Referenz konnte nicht entfernt werden.", {
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormSet>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <FormSetTitle>
          <b>Ifc-Klassen (4.3)</b>
        </FormSetTitle>
        <IconButton
          aria-label="Ifc-Referenzklasse hinzufügen"
          onClick={() => setOpen(true)}
          size="small"
          disabled={saving}
        >
          {saving ? <CircularProgress size={18} /> : <AddIcon />}
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
            onDelete={() => void removeReference(reference)}
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
            if (value) void saveReference(value);
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
