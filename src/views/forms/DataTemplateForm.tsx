import { useQuery } from "@apollo/client/react";
import { Typography, Button, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { T } from "@tolgee/react";
import {
  SubjectDetailPropsFragment,
  GetDataTemplateEntryDocument,
  GetDataTemplateEntryQuery,
  GetDataTemplateEntryQueryVariables,
} from "../../generated/graphql";
import { useDeleteEntry } from "../../hooks/useDeleteEntry";
import FormView, { FormProps } from "./FormView";
import NameFormSet from "../../components/forms/NameFormSet";
import DescriptionFormSet from "../../components/forms/DescriptionFormSet";
import CommentFormSet from "../../components/forms/CommentFormSet";
import VersionFormSet from "../../components/forms/VersionFormSet";
import DefinitionFormSet from "../../components/forms/DefinitionFormSet";
import ExampleFormSet from "../../components/forms/ExampleFormSet";
import MetaFormSet from "../../components/forms/MetaFormSet";
import StatusFormSet from "../../components/forms/StatusFormSet";
import DictionaryFormSet from "../../components/forms/DictionaryFormSet";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DataTemplateEntity } from "../../domain";

export default function DataTemplateForm(
  props: FormProps<SubjectDetailPropsFragment>
) {
  const { id } = props;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery<
    GetDataTemplateEntryQuery,
    GetDataTemplateEntryQueryVariables
  >(GetDataTemplateEntryDocument, {
    fetchPolicy: "network-only",
    variables: { id },
  });
  let entry = data?.node as SubjectDetailPropsFragment | undefined;
  const [deleteEntry] = useDeleteEntry({ cacheTypename: 'XtdSubject', id });

  if (loading) return (<Typography><T keyName={"dataTemplate.loading"} /></Typography>);
  if (error || !entry) {
    console.error("DataTemplateForm Error:", error);
    return (<Typography><T keyName={"error.error"} /></Typography>);
  }

  const handleOnDelete = async () => {
    await deleteEntry({ variables: { id } });
    enqueueSnackbar(<T keyName="dataTemplate.delete_success">Datenvorlage gelöscht.</T>);
    navigate(`/${DataTemplateEntity.path}`, { replace: true });
  };

  const handleOnUpdate = async () => {
    await refetch();
    enqueueSnackbar(<T keyName="update.update_success">Update erfolgreich.</T>);
  };

  return (
    <FormView>
      <Box display="flex" gap={2}>
        <StatusFormSet
          catalogEntryId={id}
          status={entry.status}
        />
        <DictionaryFormSet
          catalogEntryId={id}
          dictionaryId={entry.dictionary?.id ?? ""}
        />
      </Box>

      <Box>
        <NameFormSet
          catalogEntryId={id}
          names={entry.names[0].texts}
          refetch={refetch}
        />
      </Box>

      <DescriptionFormSet
        catalogEntryId={id}
        descriptions={entry.descriptions?.[0]?.texts ?? []}
        refetch={refetch}
      />

      <CommentFormSet
        catalogEntryId={id}
        comments={entry.comments?.[0]?.texts ?? []}
        refetch={refetch}
      />

      <VersionFormSet
        id={id}
        majorVersion={entry.majorVersion}
        minorVersion={entry.minorVersion}
      />

      <DefinitionFormSet
        catalogEntryId={id}
        definitions={entry.definition?.texts ?? []}
        refetch={refetch}
      />

      <ExampleFormSet
        catalogEntryId={id}
        examples={entry.examples?.[0]?.texts ?? []}
        refetch={refetch}
      />

      <MetaFormSet entry={entry} />

      <Button
        variant="contained"
        color="primary"
        startIcon={<DeleteForeverIcon />}
        onClick={handleOnDelete}
      >
        <T keyName="delete.delete_button">Löschen</T>
      </Button>
    </FormView>
  );
}
