import React from "react";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useSnackbar } from "notistack";
import { T } from "@tolgee/react";
import { useLazyQuery } from "@apollo/client/react";
import {
  FindDimensionsDocument,
  FindExternalDocumentsDocument,
  FindPropertiesDocument,
  GetPropertyEntryDocument,
  FindQuantityKindsDocument,
  FindSubjectsDocument,
  FindUnitsDocument,
  GetSubjectEntryDocument,
  SubjectDetailPropsFragment,
  ValueListWithValuesDocument,
} from "../generated/graphql";
import {
  generateDataTemplateXml,
  generateDataTemplateFilename,
  downloadXmlFile,
} from "../utils/iso23387Xml";

type DataTemplateXmlDownloadButtonProps = {
  entry: SubjectDetailPropsFragment;
};

export default function DataTemplateXmlDownloadButton(
  props: DataTemplateXmlDownloadButtonProps
) {
  const { entry } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [loadSubjects] = useLazyQuery(FindSubjectsDocument, {
    fetchPolicy: "network-only",
  });
  const [loadDocuments] = useLazyQuery(FindExternalDocumentsDocument, {
    fetchPolicy: "network-only",
  });
  const [loadProperties] = useLazyQuery(FindPropertiesDocument, {
    fetchPolicy: "network-only",
  });
  const [loadProperty] = useLazyQuery(GetPropertyEntryDocument, {
    fetchPolicy: "network-only",
  });
  const [loadDimensions] = useLazyQuery(FindDimensionsDocument, {
    fetchPolicy: "network-only",
  });
  const [loadQuantityKinds] = useLazyQuery(FindQuantityKindsDocument, {
    fetchPolicy: "network-only",
  });
  const [loadSubjectEntry] = useLazyQuery(GetSubjectEntryDocument, {
    fetchPolicy: "network-only",
  });
  const [loadUnits] = useLazyQuery(FindUnitsDocument, {
    fetchPolicy: "network-only",
  });
  const [loadValueLists] = useLazyQuery(ValueListWithValuesDocument, {
    fetchPolicy: "network-only",
  });

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const relatedSubjectIds = new Set<string>();
      (entry.connectedSubjects ?? []).forEach((relation) => {
        (relation.targetSubjects ?? []).forEach((target) => {
          relatedSubjectIds.add(target.id);
        });
      });
      (entry.connectingSubjects ?? []).forEach((relation) => {
        if (relation.connectingSubject) {
          relatedSubjectIds.add(relation.connectingSubject.id);
        }
      });

      const relatedDocumentIds = new Set<string>();
      (entry.referenceDocuments ?? []).forEach((doc) => {
        relatedDocumentIds.add(doc.id);
      });

      const subjectIds = Array.from(relatedSubjectIds);
      const documentIds = Array.from(relatedDocumentIds);

      const [subjectsResult, documentsResult] = await Promise.all([
        subjectIds.length > 0
          ? loadSubjects({
              variables: {
                input: {
                  idIn: subjectIds,
                  pageSize: subjectIds.length,
                  pageNumber: 0,
                },
              },
            })
          : Promise.resolve(undefined),
        documentIds.length > 0
          ? loadDocuments({
              variables: {
                input: {
                  idIn: documentIds,
                  pageSize: documentIds.length,
                  pageNumber: 0,
                },
              },
            })
          : Promise.resolve(undefined),
      ]);

      if (subjectsResult?.error) {
        console.log(subjectsResult.error.message);
      }
      if (documentsResult?.error) {
        console.log(documentsResult.error.message);
      }

      const subjectsById = (subjectsResult?.data?.findSubjects?.nodes ?? []).reduce(
        (acc, subject) => {
          acc[subject.id] = subject as any;
          return acc;
        },
        {} as Record<string, any>
      );

      const groupSubjectIds = (entry.connectedSubjects ?? [])
        .filter((relation) => relation.relationshipType?.name === "hasPropertyGroup")
        .flatMap((relation) => relation.targetSubjects ?? [])
        .map((subject) => subject.id);

      const missingGroupIds = groupSubjectIds.filter(
        (id) => !subjectsById[id] || !(subjectsById[id].properties ?? []).length
      );

      if (missingGroupIds.length > 0) {
        const groupDetails = await Promise.all(
          missingGroupIds.map((id) => loadSubjectEntry({ variables: { id } }))
        );
        groupDetails.forEach((result) => {
          const subject = result.data?.node;
          if (subject) {
            subjectsById[subject.id] = subject as any;
          }
        });
      }

      const relatedPropertyIds = new Set<string>();
      (entry.properties ?? []).forEach((property) => {
        relatedPropertyIds.add(property.id);
      });

      groupSubjectIds.forEach((groupId) => {
        const group = subjectsById[groupId];
        (group?.properties ?? []).forEach((property: { id: string }) => {
          relatedPropertyIds.add(property.id);
        });
      });

      const propertyIds = Array.from(relatedPropertyIds);
      const propertiesResult = [] as any;
      if (propertyIds.length > 0) {
        for (const id of propertyIds) {
          try {
            const result = await loadProperty({
              variables: { id },
            });
            propertiesResult.push(result);
          } catch (e) {
            console.error(`Error on Property ${id}:`, e);
          }
        }
      }

console.log(propertiesResult);

      if (propertiesResult?.error) {
        console.log(propertiesResult.error.message);
      }

      const documentsById = (documentsResult?.data?.findExternalDocuments?.nodes ?? []).reduce(
        (acc, doc) => {
          acc[doc.id] = doc;
          return acc;
        },
        {} as Record<string, any>
      );

      const propertiesById = propertiesResult.reduce(
        (acc: Record<string, any>, result: any) => {
          if (result?.data?.node) {
            const property = result.data.node;
            acc[property.id] = property;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      const relatedValueListIds = new Set<string>();
      (propertiesResult?.data?.findProperties?.nodes ?? []).forEach((property) => {
        (property.possibleValues ?? []).forEach((valueList: { id: string }) => {
          relatedValueListIds.add(valueList.id);
        });
      });

      const valueListIds = Array.from(relatedValueListIds);
      const valueListsResult = valueListIds.length > 0
        ? await loadValueLists({
            variables: {
              input: {
                idIn: valueListIds,
                pageSize: valueListIds.length,
                pageNumber: 0,
              },
            },
          })
        : undefined;

        if (valueListsResult?.error) {
          console.log(valueListsResult.error.message);
        }

      const valueListValuesById = (valueListsResult?.data?.findValueLists?.nodes ?? []).reduce(
        (acc, valueList) => {
          const language = valueList.names
            ?.flatMap((translation) => translation.texts ?? [])
            .map((text) => text.language?.code)
            .find((code) => !!code);

          const values = (valueList.values?.nodes ?? []).map((node) => {
            const nameText = node.orderedValue?.names
              ?.flatMap((translation) => translation.texts ?? [])
              .map((text) => text.text)
              .find((text) => text !== undefined && text !== null) ??
              node.orderedValue?.name ??
              "";

            return {
              text: nameText,
              order: typeof node.order === "number" ? node.order : 0,
            };
          });

          acc[valueList.id] = {
            language,
            values,
          };
          return acc;
        },
        {} as Record<string, any>
      );

      const unitIds = new Set<string>();
      const dimensionIds = new Set<string>();
      const quantityKindIds = new Set<string>();
      (propertiesResult?.data?.findProperties?.nodes ?? []).forEach((property) => {
        (property.units ?? []).forEach((unit: { id: string }) => {
          unitIds.add(unit.id);
        });
        if (property.dimension?.id) {
          dimensionIds.add(property.dimension.id);
        }
        (property.quantityKinds ?? []).forEach((quantityKind: { id: string }) => {
          quantityKindIds.add(quantityKind.id);
        });
      });

      const unitsResult = unitIds.size > 0
        ? await loadUnits({
            variables: {
              input: {
                idIn: Array.from(unitIds),
                pageSize: unitIds.size,
                pageNumber: 0,
              },
            },
          })
        : undefined;

        if (unitsResult?.error) {
          console.log(unitsResult.error.message);
        }

      const dimensionsResult = dimensionIds.size > 0
        ? await loadDimensions({
            variables: {
              input: {
                idIn: Array.from(dimensionIds),
                pageSize: dimensionIds.size,
                pageNumber: 0,
              },
            },
          })
        : undefined;

        if (dimensionsResult?.error) {
          console.log(dimensionsResult.error.message);
        }

      const quantityKindsResult = quantityKindIds.size > 0
        ? await loadQuantityKinds({
            variables: {
              input: {
                idIn: Array.from(quantityKindIds),
                pageSize: quantityKindIds.size,
                pageNumber: 0,
              },
            },
          })
        : undefined;

        if (quantityKindsResult?.error) {
          console.log(quantityKindsResult.error.message);
        }

      const unitsById = (unitsResult?.data?.findUnits?.nodes ?? []).reduce(
        (acc, unit) => {
          acc[unit.id] = unit;
          return acc;
        },
        {} as Record<string, any>
      );

      const dimensionsById = (dimensionsResult?.data?.findDimensions?.nodes ?? []).reduce(
        (acc, dimension) => {
          acc[dimension.id] = dimension;
          return acc;
        },
        {} as Record<string, any>
      );

      const quantityKindsById = (quantityKindsResult?.data?.findQuantityKinds?.nodes ?? []).reduce(
        (acc, quantityKind) => {
          acc[quantityKind.id] = quantityKind;
          return acc;
        },
        {} as Record<string, any>
      );

      const xml = generateDataTemplateXml(entry, {
        subjectsById,
        documentsById,
        dimensionsById,
        propertiesById,
        quantityKindsById,
        unitsById,
        valueListValuesById,
      });
      const filename = generateDataTemplateFilename(entry);
      downloadXmlFile(xml, filename);
      enqueueSnackbar(<T keyName="dataTemplate.export_xml_success" />, {
        variant: "success",
      });
    } catch (error) {
      console.error("DataTemplate XML export failed", error);
      enqueueSnackbar(<T keyName="dataTemplate.export_xml_error" />, {
        variant: "error",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<FileDownloadIcon />}
      onClick={handleDownload}
      disabled={isDownloading}
    >
      <T keyName="dataTemplate.export_xml_button" />
    </Button>
  );
}
