import React from 'react';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";
import { Typography, Button, Box, Autocomplete, TextField, Chip, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { T, useTranslate } from "@tolgee/react";
import {
  SubjectDetailPropsFragment,
  GetDataTemplateEntryDocument,
  GetSubjectEntryDocument,
  FindItemDocument,
  CreateRelationshipDocument,
  DeleteRelationshipDocument,
  XtdRelationshipKindEnum,
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
import { DataTemplateEntity, getEntityType, ClassEntity, DocumentEntity, PropertyEntity, PropertyGroupEntity } from "../../domain";
import useDebounce from "../../hooks/useDebounce";
import { CatalogRecord } from "../../types";
import TransferListView from '../TransferListView';
import TransferListViewRelationshipToSubject from '../TransferListViewRelationshipToSubject';
import RelationChipsViewEditable from '../RelationChipsViewEditable';
import RelationGraphView from '../RelationGraphView';
import DataTemplateXmlDownloadButton from '../../components/DataTemplateXmlDownloadButton';

export default function DataTemplateForm(
  props: FormProps<SubjectDetailPropsFragment>
) {
  const { id } = props;
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GetSubjectEntryDocument, {
    fetchPolicy: "network-only",
    variables: { id },
  });
  let entry = data?.node as SubjectDetailPropsFragment | undefined;
  const [deleteEntry] = useDeleteEntry({ cacheTypename: 'XtdSubject', id });

  // Class selection UI state
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [selectedClass, setSelectedClass] = React.useState<CatalogRecord | null>(null);
  const [copyingRelations, setCopyingRelations] = React.useState(false);
  const [findItems, { data: searchData, loading: searchLoading }] = useLazyQuery(FindItemDocument);
  const [loadClassEntry] = useLazyQuery(GetSubjectEntryDocument, { fetchPolicy: 'network-only' });
  const [createRelationship] = useMutation(CreateRelationshipDocument, { errorPolicy: 'all' });
  const [deleteRelationship] = useMutation(DeleteRelationshipDocument, { errorPolicy: 'all' });

  React.useEffect(() => {
    if (debouncedSearchValue.length >= 2) {
      const input = {
        entityTypeIn: [ClassEntity.recordType],
        tagged: ClassEntity.tags,
        query: debouncedSearchValue,
      } as any;
      findItems({ variables: { input, pageSize: 20, pageNumber: 0 } });
    }
  }, [debouncedSearchValue, findItems]);

  // initialize selectedClass from existing relationship (hasObjectType)
  React.useEffect(() => {
    if (!entry) return;
    console.debug('DataTemplateForm: initializing selectedClass for entry', entry.id, entry.connectedSubjects);
    const rel = entry.connectedSubjects?.find((r: any) => r.relationshipType?.name === 'hasObjectType');
    if (rel && rel.targetSubjects && rel.targetSubjects.length > 0) {
      const t = rel.targetSubjects[0];
      console.debug('DataTemplateForm: found hasObjectType target', t.id, t.name);
      setSelectedClass({ id: t.id, recordType: 'Subject', name: typeof t.name === 'string' ? t.name : undefined, tags: t.tags ?? [] });
    } else {
      // No hasObjectType relation on this entry — ensure UI is cleared
      console.debug('DataTemplateForm: no hasObjectType for entry, clearing selection', entry.id);
      setSelectedClass(null);
      setSearchValue('');
    }
  }, [entry]);

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

  const relatedDocuments = entry.referenceDocuments ?? [];

  const relatedRelations = entry.connectedSubjects ?? [];
  // Filter nur hasPropertyGroup Relationen
  const hasPropertyGroupRelation = relatedRelations.find(rel => 
    (rel as any).relationshipType?.name === "hasPropertyGroup"
  );
  const allTargetSubjects = hasPropertyGroupRelation?.targetSubjects ?? [];
  const relatedPropertyGroups = {
    relId: hasPropertyGroupRelation?.id ?? null,
    targetSubjects: allTargetSubjects,
    relationshipType: 'XTD_INSTANCE_LEVEL' as unknown as XtdRelationshipKindEnum,
    name: "hasPropertyGroup"
  };

  const handleCopySelectedClassRelations = async () => {
    if (!selectedClass) return;

    setCopyingRelations(true);

    try {
      const result = await loadClassEntry({
        variables: { id: selectedClass.id },
      });

      const selectedClassEntry = result.data?.node as SubjectDetailPropsFragment | undefined;
      if (!selectedClassEntry) {
        throw new Error('Selected class entry could not be loaded');
      }

      const existingPropertyIds = new Set((entry.properties ?? []).map((property: any) => property.id));
      const existingPropertyGroupIds = new Set((relatedPropertyGroups.targetSubjects ?? []).map((group: any) => group.id));

      const propertyIdsToCopy = (selectedClassEntry.properties ?? [])
        .map((property: any) => property.id)
        .filter((propertyId: string) => !existingPropertyIds.has(propertyId));

      const propertyGroupIdsToCopy = (selectedClassEntry.connectedSubjects ?? [])
        .filter((relation: any) => relation.relationshipType?.name === 'hasPropertyGroup')
        .flatMap((relation: any) => relation.targetSubjects ?? [])
        .map((target: any) => target.id)
        .filter((groupId: string) => !existingPropertyGroupIds.has(groupId));

      if (propertyIdsToCopy.length === 0 && propertyGroupIdsToCopy.length === 0) {
        enqueueSnackbar('Keine neuen Relationen zum Übernehmen gefunden.', { variant: 'info' });
        return;
      }

      if (propertyIdsToCopy.length > 0) {
        await createRelationship({
          variables: {
            input: {
              relationshipType: 'Properties',
              fromId: id,
              toIds: propertyIdsToCopy,
            }
          }
        });
      }

      if (propertyGroupIdsToCopy.length > 0) {
        await createRelationship({
          variables: {
            input: {
              relationshipType: 'RelationshipToSubject',
              fromId: id,
              toIds: propertyGroupIdsToCopy,
              properties: {
                relationshipToSubjectProperties: {
                  name: 'hasPropertyGroup',
                  relationshipType: 'XTD_INSTANCE_LEVEL'
                }
              }
            }
          }
        });
      }

      await refetch();
      enqueueSnackbar('Relationen der ausgewählten Klasse wurden übernommen.', { variant: 'success' });
    } catch (error) {
      console.error('Error copying class relations to data template', error);
      enqueueSnackbar('Fehler beim Übernehmen der Relationen.', { variant: 'error' });
    } finally {
      setCopyingRelations(false);
    }
  };
  
  return (
    <FormView>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <DataTemplateXmlDownloadButton entry={entry} />
      </Box>
      {/* Objekt‑Typ Auswahl (eine Klasse) */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="subtitle1" sx={{ mr: 1, whiteSpace: 'nowrap' }}>
          <b><T keyName="dataTemplate.object_type">Objekttyp</T></b>
        </Typography>
        {!selectedClass ? (
          <Autocomplete sx={{ width: '25%' }}
            options={(searchData?.search?.nodes ?? []).map((item: any) => ({
              id: item.id,
              recordType: item.recordType,
              name: typeof item.name === 'string' ? item.name : undefined,
              tags: item.tags ?? [],
            }))}
            getOptionLabel={(option: any) => option.name ?? ''}
            value={selectedClass}
            onChange={async (_, newValue) => {
              const prev = selectedClass;
              setSelectedClass(newValue);

              try {
                // delete previous relation if exists and different
                if (prev && (!newValue || prev.id !== newValue.id)) {
                  await deleteRelationship({ variables: { input: { relationshipType: 'RelationshipToSubject', fromId: id, toId: prev.id, name: 'hasObjectType' } } });
                }

                // create new relation if selected
                if (newValue) {
                  await createRelationship({ variables: { input: { relationshipType: 'RelationshipToSubject', fromId: id, toIds: [newValue.id], properties: { relationshipToSubjectProperties: { name: 'hasObjectType', relationshipType: 'XTD_INSTANCE_LEVEL' } } } } });
                }

                await refetch();
                enqueueSnackbar(<T keyName="update.update_success">Update erfolgreich.</T>);
              } catch (error) {
                console.error('Error updating hasObjectType relationship', error);
                enqueueSnackbar('Fehler beim Speichern der Objekttyp-Zuordnung', { variant: 'error' });
                // revert selection on error
                setSelectedClass(prev ?? null);
              }
            }}
            inputValue={searchValue}
            onInputChange={(_, newInput, reason) => {
              if (reason === 'input') setSearchValue(newInput);
            }}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            noOptionsText={searchValue.length < 2 ? <T keyName="search.min_chars">Mindestens 2 Zeichen eingeben</T> : <T keyName="search.no_results">Keine Ergebnisse</T>}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={`${t('search.search')}...`}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {searchLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
                label={selectedClass.name}
                size="small"
                onClick={() => {
                  const def = getEntityType(selectedClass.recordType, (selectedClass.tags ?? []).map((t: any) => t.id));
                  navigate(`/${def.path}/${selectedClass.id}`);
                }}
                clickable
                onDelete={async () => {
                  // delete relationship and clear selection
                  try {
                    console.debug('DataTemplateForm: deleting hasObjectType via chip delete', { fromId: id, toId: selectedClass.id });
                    await deleteRelationship({ variables: { input: { relationshipType: 'RelationshipToSubject', fromId: id, toId: selectedClass.id, name: 'hasObjectType' } } });
                    setSelectedClass(null);
                    setSearchValue('');
                    await refetch();
                    enqueueSnackbar(<T keyName="update.update_success">Objekttyp entfernt.</T>);
                  } catch (error) {
                    console.error('Error deleting hasObjectType relationship', error);
                    enqueueSnackbar('Fehler beim Entfernen der Objekttyp-Zuordnung', { variant: 'error' });
                  }
                }}
              />
            <Button
              size="small"
              variant="outlined"
              onClick={handleCopySelectedClassRelations}
              disabled={copyingRelations}
            >
              {copyingRelations ? `${t('dataTemplate.copying')}...` : `${t('dataTemplate.copy_properties')}`}
            </Button>
          </Box>
          )}
      </Box>

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

      <TransferListViewRelationshipToSubject
        title={<span><b><T keyName="propertyGroup.titlePlural" /></b></span>}
        relatingItemId={id}
        relationshipType={'RelationshipToSubject'}
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
          title={<span><b><T keyName="property.titlePlural" /></b></span>}
          relatingItemId={id}
          relationshipType={'Properties'}
          relationships={entry.properties ?? []}
          searchInput={{ entityTypeIn: [PropertyEntity.recordType] }}
          onCreate={handleOnUpdate}
          onUpdate={handleOnUpdate}
          onDelete={handleOnUpdate}
      />

      <TransferListView
          title={<span><b><T keyName="document.titlePlural" /></b></span>}
          relatingItemId={id}
          relationshipType={'ReferenceDocuments'}
          relationships={relatedDocuments}
          searchInput={{
              entityTypeIn: [DocumentEntity.recordType],
              tagged: DocumentEntity.tags
          }}
          onCreate={handleOnUpdate}
          onUpdate={handleOnUpdate}
          onDelete={handleOnUpdate}
      />
      
      {/* ==================== KOMPAKTE RELATIONS-ANSICHT ==================== */}

      {/* Kompakte editierbare Chip-Ansicht für Datenvorlagenbeziehungen */}
      <RelationChipsViewEditable entry={entry} context="dataTemplate" onUpdate={handleOnUpdate} />

      {/* Relationsgraph - Visualisierung aller Relationen für Datenvorlagen */}
      <RelationGraphView entry={entry} context="dataTemplate" />

      {/* ==================== ENDE KOMPAKTE RELATIONS-ANSICHT ==================== */}

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
