import {
  RelationshipKindEnum,
  RelationshipRecordType,
  SubjectDetailPropsFragment,
  useDeleteEntryMutation,
  useGetSubjectEntryQuery,
} from "../../generated/types";
import { Typography, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import MetaFormSet from "../../components/forms/MetaFormSet";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NameFormSet from "../../components/forms/NameFormSet";
import DescriptionFormSet from "../../components/forms/DescriptionFormSet";
import CommentFormSet from "../../components/forms/CommentFormSet";
import VersionFormSet from "../../components/forms/VersionFormSet";
import { PropertyEntity, DocumentEntity, PropertyGroupEntity, ClassEntity, ValueListEntity, UnitEntity } from "../../domain";
import FormView, { FormProps } from "./FormView";
import TransferListView from "../TransferListView";
import TransferListViewRelationshipToSubject from "../TransferListViewRelationshipToSubject";
import RelatingRecordsFormSet from "../../components/forms/RelatingRecordsFormSet";
import { T, useTranslate } from "@tolgee/react";
import StatusFormSet from "../../components/forms/StatusFormSet";
import DefinitionFormSet from "../../components/forms/DefinitionFormSet";
import ExampleFormSet from "../../components/forms/ExampleFormSet";
import FormSet, { FormSetTitle } from "../../components/forms/FormSet";
import { useNavigate } from "react-router-dom";

export default function DomainClassForm(
  props: FormProps<SubjectDetailPropsFragment>
) {
  const { id } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate(); // Moved to top level
  const navigate = useNavigate();

  // fetch domain model
  const { loading, error, data, refetch } = useGetSubjectEntryQuery({
    fetchPolicy: "network-only",
    variables: { id },
  });

  let entry = data?.node as SubjectDetailPropsFragment | undefined;
  const [deleteEntry] = useDeleteEntryMutation({
    update: (cache: any) => {
      cache.evict({ id: `XtdSubject:${id}` });
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          hierarchy: (_value: any, { DELETE }: any) => DELETE,
        },
      });
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          search: (_value: any, { DELETE }: any) => DELETE,
        },
      });
    },
  });

  if (loading)
    return (
      <Typography>
        <T keyName={"class.loading"} />
      </Typography>
    );
  if (error || !entry)
    return (
      <Typography>
        <T keyName={"error.error"} />
      </Typography>
    );

  const handleOnDelete = async () => {
    await deleteEntry({ variables: { id } });
    enqueueSnackbar(
      <T keyName="domain_class_form.delete_success">Klasse gelöscht.</T>
    );
    navigate(`/${ClassEntity.path}`, { replace: true });
  };

  const handleOnUpdate = async () => {
    await refetch();
    enqueueSnackbar(
      <T keyName="update.update_success">Update erfolgreich.</T>
    );
  };

  const relatedRelations = entry.connectedSubjects ?? [];
  const allTargetSubjects = relatedRelations.flatMap(rel => rel.targetSubjects ?? []);
  console.log("Related Relations", relatedRelations);
  console.log("All Target Subjects", allTargetSubjects);
  console.log("id", entry.connectedSubjects)
  const relatedPropertyGroups = {
    relId: relatedRelations[0]?.id ?? null,
    targetSubjects: allTargetSubjects,
    relationshipType: RelationshipKindEnum.XTD_SCHEMA_LEVEL
  };

  const relatedProperties = entry.properties ?? [];
  const relatedDocuments = entry.referenceDocuments ?? [];

  return (
    <FormView>
      <StatusFormSet
        catalogEntryId={id}
        status={entry.status}
      />

      <NameFormSet
        catalogEntryId={id}
        names={entry.names[0].texts}
        refetch={refetch}
      />

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

      <FormSet>
        <FormSetTitle>
          <b>
            <T keyName="document.more_infos" />
          </b>
        </FormSetTitle>
        <Typography sx={{ mt: 2 }}>
          Sprache des Erstellers: {entry.languageOfCreator ? entry.languageOfCreator.code : "-"}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Herkunftsland: {entry.countryOfOrigin ? entry.countryOfOrigin.name + " (" + entry.countryOfOrigin.code + ")" : "-"}
        </Typography>
      </FormSet>

      {/* Merkmalsgruppen */}

      <TransferListViewRelationshipToSubject
        title={<span><T keyName={"domain_class_form.assigned_property_groups"} /></span>}
        relatingItemId={id}
        relationshipType={RelationshipRecordType.RelationshipToSubject}
        relationships={relatedPropertyGroups}
        searchInput={{
          entityTypeIn: [PropertyGroupEntity.recordType],
          tagged: PropertyGroupEntity.tags
        }}
        onCreate={handleOnUpdate}
        onUpdate={handleOnUpdate}
        onDelete={handleOnUpdate}
      />

      <TransferListView
        title={
          <span>
            {t('domain_class_form.assigned_properties', { name: entry.name })}
          </span>
        }
        relatingItemId={id}
        relationshipType={RelationshipRecordType.Properties}
        relationships={relatedProperties}
        searchInput={{
          entityTypeIn: [PropertyEntity.recordType],
          tagged: PropertyEntity.tags,
        }}
        onCreate={handleOnUpdate}
        onUpdate={handleOnUpdate}
        onDelete={handleOnUpdate}
      />

      <TransferListView
        title={<span><T keyName={"domain_class_form.reference_documents"} /></span>}
        relatingItemId={id}
        relationshipType={RelationshipRecordType.ReferenceDocuments}
        relationships={relatedDocuments}
        searchInput={{
          entityTypeIn: [DocumentEntity.recordType],
          tagged: DocumentEntity.tags
        }}
        onCreate={handleOnUpdate}
        onUpdate={handleOnUpdate}
        onDelete={handleOnUpdate}
      />

      <TransferListView
        title={<span><T keyName={"domain_class_form.similar_concepts"} /></span>}
        relatingItemId={id}
        relationshipType={RelationshipRecordType.SimilarTo}
        relationships={entry.similarTo ?? []}
        searchInput={{
          entityTypeIn: [DocumentEntity.recordType, PropertyEntity.recordType, ValueListEntity.recordType, UnitEntity.recordType, ClassEntity.recordType],
          tagged: [
            ...(DocumentEntity.tags ?? []),
            ...(PropertyEntity.tags ?? []),
            ...(ValueListEntity.tags ?? []),
            ...(UnitEntity.tags ?? []),
            ...(ClassEntity.tags ?? [])
          ]
        }}
        onCreate={handleOnUpdate}
        onUpdate={handleOnUpdate}
        onDelete={handleOnUpdate}
      />

      {/* 
      <RelatingRecordsFormSet
        title={
          <span>
            <b>
              <T keyName="group.titlePlural" />
            </b>
            ,{" "}
            <T keyName="domain_class_form.groups_using_class">
              die diese Klasse anwenden
            </T>
          </span>
        }
        emptyMessage={
            t('domain_class_form.no_groups_using_class')
        }
        relatingRecords={
          entry?.collectedBy.nodes.map((node) => node.relatingCollection) ?? []
        }
      /> */}

      <MetaFormSet entry={entry} />

      <Button
        variant="contained"
        color="primary"
        startIcon={<DeleteForeverIcon />}
        onClick={handleOnDelete}
      >
        <T keyName="domain_class_form.delete_button">Löschen</T>
      </Button>
    </FormView>
  );
}
