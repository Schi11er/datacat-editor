import {
  DimensionPropsFragment,
  ExternalDocumentPropsFragment,
  PropertyDetailPropsFragment,
  QuantityKindPropsFragment,
  SubjectDetailPropsFragment,
  TranslationPropsFragment,
  UnitDetailPropsFragment,
  XtdDataTypeEnum,
} from "../generated/graphql";

type XmlText = {
  language?: string;
  text: string;
};

const DEFAULT_LANGUAGE = "und";
const DUMMY_GUID = "00000000-0000-0000-0000-000000000000";

type SubjectExportNode = {
  id: string;
  name?: string | null;
  names?: TranslationPropsFragment[] | null;
  definition?: TranslationPropsFragment | null;
  descriptions?: TranslationPropsFragment[] | null;
  examples?: Array<TranslationPropsFragment | null> | null;
  languageOfCreator?: { code?: string | null } | null;
  countryOfOrigin?: { code?: string | null } | null;
  majorVersion?: number | null;
  minorVersion?: number | null;
  status?: string | null;
  created?: string | null;
  dateOfCreation?: string | null;
  referenceDocuments?: Array<{ id: string }> | null;
  properties?: Array<{ id: string }> | null;
  connectedSubjects?: Array<{
    relationshipType?: { name?: string | null } | null;
    targetSubjects?: Array<{ id: string }> | null;
  }> | null;
  connectingSubjects?: Array<{
    relationshipType?: { name?: string | null } | null;
    connectingSubject?: { id: string } | null;
  }> | null;
};

type ExportContext = {
  subjectsById?: Record<string, SubjectExportNode>;
  documentsById?: Record<string, ExternalDocumentPropsFragment>;
  dimensionsById?: Record<string, DimensionPropsFragment>;
  propertiesById?: Record<string, PropertyDetailPropsFragment>;
  quantityKindsById?: Record<string, QuantityKindPropsFragment>;
  unitsById?: Record<string, UnitDetailPropsFragment>;
  valueListValuesById?: Record<string, ValueListValuesEntry>;
};

type ValueListValuesEntry = {
  language?: string;
  values: Array<{
    text: string;
    order: number;
  }>;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeLanguage(code?: string | null): string | undefined {
  return code && code.trim() ? code : DEFAULT_LANGUAGE;
}

function collectTexts(
  translations?: Array<TranslationPropsFragment | null> | null
): XmlText[] {
  const texts: XmlText[] = [];
  (translations ?? []).forEach((translation) => {
    translation?.texts?.forEach((item) => {
      if (item?.text === undefined || item?.text === null) return;
      texts.push({
        language: normalizeLanguage(item.language?.code),
        text: item.text,
      });
    });
  });
  return texts;
}

function ensureTextOrEmpty(texts: XmlText[], fallback?: string | null): XmlText[] {
  if (texts.length > 0) return texts;
  if (fallback && fallback.trim()) {
    return [{ language: DEFAULT_LANGUAGE, text: fallback }];
  }
  return [{ language: DEFAULT_LANGUAGE, text: "" }];
}

function renderMultiLangElements(tag: string, texts: XmlText[]): string[] {
  return texts.map(
    (item) => {
      const languageAttr = item.language ? ` language="${escapeXml(item.language)}"` : "";
      return `    <${tag}${languageAttr}>${escapeXml(item.text)}</${tag}>`;
    }
  );
}

function renderSingleDefinition(texts: XmlText[]): string {
  const value = texts[0]?.text ?? "";
  const language = texts[0]?.language ?? DEFAULT_LANGUAGE;
  const languageAttr = language ? ` language="${escapeXml(language)}"` : "";
  return `    <Definition${languageAttr}>${escapeXml(value)}</Definition>`;
}

function stripXtdPrefix(value?: string | null): string {
  if (!value) return "";
  return value.replace(/^XTD_/, "");
}

function mapDataType(dataType?: XtdDataTypeEnum | null): string {
  if (!dataType) return "";
  return stripXtdPrefix(dataType);
}

function formatRational(rational?: { numerator?: number | null; denominator?: number | null } | null): string {
  if (!rational) return "";
  const numerator = rational.numerator ?? 0;
  const denominator = rational.denominator ?? 1;
  if (denominator === 0) return `${numerator}`;
  return denominator === 1 ? `${numerator}` : `${numerator}/${denominator}`;
}

function formatDecimalFromRational(rational?: { numerator?: number | null; denominator?: number | null } | null): string {
  if (!rational) return "0";
  const numerator = rational.numerator ?? 0;
  const denominator = rational.denominator ?? 1;
  if (denominator === 0) return "0";
  return (numerator / denominator).toString();
}

function normalizeDateTime(value?: string | null): string {
  if (!value) return "";

  const trimmed = value.trim();
  if (!trimmed) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return `${trimmed}T00:00:00Z`;
  }

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  return trimmed;
}

function createDimensionXml(dimension: DimensionPropsFragment): string[] {
  const lines: string[] = [
    `  <Dimension dt:GUID="${escapeXml(dimension.id)}" dateOfCreation="${escapeXml(getDateOfCreation(dimension))}">`,
  ];

  renderConceptFields(dimension as SubjectExportNode, lines);

  const amount = formatDecimalFromRational(dimension.amountOfSubstanceExponent);
  const electric = formatDecimalFromRational(dimension.electricCurrentExponent);
  const length = formatDecimalFromRational(dimension.lengthExponent);
  const luminous = formatDecimalFromRational(dimension.luminousIntensityExponent);
  const mass = formatDecimalFromRational(dimension.massExponent);
  const thermo = formatDecimalFromRational(dimension.thermodynamicTemperatureExponent);
  const time = formatDecimalFromRational(dimension.timeExponent);

  lines.push(`    <DimensionExponentForAmountOfSubstance>${escapeXml(amount)}</DimensionExponentForAmountOfSubstance>`);
  lines.push(`    <DimensionExponentForElectricCurrent>${escapeXml(electric)}</DimensionExponentForElectricCurrent>`);
  lines.push(`    <DimensionExponentForLength>${escapeXml(length)}</DimensionExponentForLength>`);
  lines.push(`    <DimensionExponentForLuminousIntensity>${escapeXml(luminous)}</DimensionExponentForLuminousIntensity>`);
  lines.push(`    <DimensionExponentForMass>${escapeXml(mass)}</DimensionExponentForMass>`);
  lines.push(`    <DimensionExponentForThermodynamicTemperature>${escapeXml(thermo)}</DimensionExponentForThermodynamicTemperature>`);
  lines.push(`    <DimensionExponentForTime>${escapeXml(time)}</DimensionExponentForTime>`);

  lines.push(`  </Dimension>`);
  return lines;
}

function createQuantityKindXml(quantityKind: QuantityKindPropsFragment): string[] {
  const lines: string[] = [
    `  <QuantityKind dt:GUID="${escapeXml(quantityKind.id)}" dateOfCreation="${escapeXml(getDateOfCreation(quantityKind))}">`,
  ];

  renderConceptFields(quantityKind as SubjectExportNode, lines);

  if (quantityKind.dimension?.id) {
    lines.push(`    <DimensionRef dt:GUID="${escapeXml(quantityKind.dimension.id)}" />`);
  } else {
    lines.push(`    <DimensionRef dt:GUID="${DUMMY_GUID}" />`);
  }

  lines.push(`  </QuantityKind>`);
  return lines;
}

function createUnitXml(unit: UnitDetailPropsFragment): string[] {
  const lines: string[] = [
    `  <Unit dt:GUID="${escapeXml(unit.id)}" dateOfCreation="${escapeXml(getDateOfCreation(unit))}">`,
  ];

  renderConceptFields(unit as SubjectExportNode, lines);

  if (unit.symbol?.texts?.length) {
    lines.push(...renderMultiLangElements("Symbol", collectTexts([unit.symbol])));
  }

  if (unit.dimension?.id) {
    lines.push(`    <DimensionRef dt:GUID="${escapeXml(unit.dimension.id)}" />`);
  } else {
    lines.push(`    <DimensionRef dt:GUID="${DUMMY_GUID}" />`);
  }

  lines.push(`    <Scale>${escapeXml(stripXtdPrefix(unit.scale) || "LINEAR")}</Scale>`);
  lines.push(`    <Base>${escapeXml(stripXtdPrefix(unit.base) || "ONE")}</Base>`);

  const coefficient = formatRational(unit.coefficient);
  lines.push(`    <Coefficient>${escapeXml(coefficient || "1/10")}</Coefficient>`);

  const offset = formatRational(unit.offset);
  lines.push(`    <Offset>${escapeXml(offset || "0/1")}</Offset>`);

  lines.push(`  </Unit>`);
  return lines;
}

function getDateOfCreation(node?: { created?: string | null; dateOfCreation?: string | null } | null): string {
  return normalizeDateTime(node?.created ?? node?.dateOfCreation ?? "");
}

function getRelationTargets(node: SubjectExportNode | undefined, relationName: string): Array<{ id: string }> {
  const connectingTargets = (node?.connectingSubjects ?? [])
    .filter((relation) =>
      (relation.relationshipType?.name || "").toLowerCase() === relationName
    )
    .map((relation) => relation.connectingSubject)
    .filter((subject): subject is { id: string } => !!subject?.id);

  return [...connectingTargets];
}

function createReferenceDocumentXml(
  doc: ExternalDocumentPropsFragment | undefined,
  fallbackName: string | null,
  fallbackId: string
): string[] {
  const nameTexts = ensureTextOrEmpty(collectTexts(doc?.names ?? []), fallbackName);
  const languageList = (doc?.languages ?? [])
    .map((language) => language?.code)
    .filter((language): language is string => typeof language === "string");
  const resolvedLanguages = languageList.length > 0 ? languageList : [DEFAULT_LANGUAGE];
  return [
    `  <ReferenceDocument dt:GUID="${escapeXml(doc?.id ?? fallbackId)}" dateOfCreation="${escapeXml(getDateOfCreation(doc))}">`,
    ...renderMultiLangElements("Name", nameTexts),
    renderSingleDefinition([{ language: DEFAULT_LANGUAGE, text: "" }]),
    doc?.majorVersion !== null && doc?.majorVersion !== undefined
      ? `    <MajorVersion>${doc?.majorVersion}</MajorVersion>`
      : undefined,
    doc?.minorVersion !== null && doc?.minorVersion !== undefined
      ? `    <MinorVersion>${doc?.minorVersion}</MinorVersion>`
      : undefined,
    doc?.status ? `    <Status>${escapeXml(stripXtdPrefix(doc.status))}</Status>` : undefined,
    doc?.dateOfPublication
      ? `    <DateOfPublication>${escapeXml(normalizeDateTime(doc.dateOfPublication))}</DateOfPublication>`
      : undefined,
    doc?.author ? `    <Author>${escapeXml(doc.author)}</Author>` : undefined,
    doc?.isbn ? `    <ISBN>${escapeXml(doc.isbn)}</ISBN>` : undefined,
    ...resolvedLanguages.map((language) => `    <Language>${escapeXml(language)}</Language>`),
    doc?.publisher ? `    <Publisher>${escapeXml(doc.publisher)}</Publisher>` : undefined,
    doc?.documentUri ? `    <URI>${escapeXml(doc.documentUri)}</URI>` : undefined,
    `  </ReferenceDocument>`,
  ].filter(Boolean) as string[];
}

function createObjectTypeXml(subject: SubjectExportNode): string[] {
  const lines = [
    `  <ObjectType dt:GUID="${escapeXml(subject.id)}" dateOfCreation="${escapeXml(getDateOfCreation(subject))}">`,
  ];
  renderConceptFields(subject, lines);

  const hasPartTargets = getRelationTargets(subject, "partof");
  const isSubtypeTargets = getRelationTargets(subject, "specializes");

  hasPartTargets.forEach((target) => {
    lines.push(`    <HasPartRef dt:GUID="${escapeXml(target.id)}" />`);
  });

  isSubtypeTargets.forEach((target) => {
    lines.push(`    <IsSubtypeOfRef dt:GUID="${escapeXml(target.id)}" />`);
  });

  lines.push(`  </ObjectType>`);
  return lines.filter(Boolean) as string[];
}

function createGroupOfPropertiesXml(subject: SubjectExportNode): string[] {
  const propertyIds = (subject.properties ?? []).map((property) => property.id);
  const lines = [
    `  <GroupOfProperties dt:GUID="${escapeXml(subject.id)}" dateOfCreation="${escapeXml(getDateOfCreation(subject))}">`,
  ];
  renderConceptFields(subject, lines);

  propertyIds.forEach((propertyId) => {
    lines.push(`    <HasPropertyRef dt:GUID="${escapeXml(propertyId)}" />`);
  });

  const hasPartTargets = getRelationTargets(subject, "partof");
  const isSubtypeTargets = getRelationTargets(subject, "specializes");

  hasPartTargets.forEach((target) => {
    lines.push(`    <HasPartRef dt:GUID="${escapeXml(target.id)}" />`);
  });

  isSubtypeTargets.forEach((target) => {
    lines.push(`    <IsSubtypeOfRef dt:GUID="${escapeXml(target.id)}" />`);
  });

  lines.push(`  </GroupOfProperties>`);
  return lines.filter(Boolean) as string[];
}

function createPropertyXml(
  property: SubjectDetailPropsFragment["properties"][number] | PropertyDetailPropsFragment,
  valueListValuesById?: Record<string, ValueListValuesEntry>
): string[] {
  const dataTypeName = mapDataType(property.dataType);
console.log("Creating XML for property:", property.id, "with data type:", dataTypeName);
  const lines: string[] = [
    `  <Property dt:GUID="${escapeXml(property.id)}" dateOfCreation="${escapeXml(getDateOfCreation(property))}">`,
  ];

  renderConceptFields(property as SubjectExportNode, lines);

  lines.push(
    dataTypeName
      ? `    <DataType name="${escapeXml(dataTypeName)}">`
      : `    <DataType>`
  );

  if (property.dataFormat) {
    lines.push(`      <DataFormat value="${escapeXml(property.dataFormat)}" />`);
  }

  if (property.possibleValues && property.possibleValues.length > 0) {
    lines.push(`      <PossibleValues>`);

    property.possibleValues.forEach((valueListRef, index) => {
      const listEntry = valueListValuesById?.[valueListRef.id];
      const listLanguage = listEntry?.language ?? DEFAULT_LANGUAGE;
      const languageAttr = listLanguage
        ? ` language="${escapeXml(listLanguage)}"`
        : "";
      lines.push(`        <ValueList${languageAttr}>`);

      if (listEntry?.values && listEntry.values.length > 0) {
        listEntry.values
          .sort((a, b) => a.order - b.order)
          .forEach((valueItem) => {
            lines.push(
              `          <Value order="${valueItem.order}">${escapeXml(valueItem.text)}</Value>`
            );
          });
      } else {
        const fallbackText = valueListRef.name || "";
        lines.push(
          `          <Value order="${index + 1}">${escapeXml(fallbackText)}</Value>`
        );
      }

      lines.push(`        </ValueList>`);
    });

    lines.push(`      </PossibleValues>`);
  }

  lines.push(`    </DataType>`);

  const symbolEntries = (property as any).symbols as Array<any> | null | undefined;
  symbolEntries?.forEach((symbol) => {
    const text = symbol?.symbol?.text ?? "";
    if (text) {
      lines.push(`    <Symbol>${escapeXml(text)}</Symbol>`);
    }
  });

  const dimension = (property as any).dimension as { id?: string } | null | undefined;
  if (dimension?.id) {
    lines.push(`    <DimensionRef dt:GUID="${escapeXml(dimension.id)}" />`);
  }

  const units = (property as any).units as Array<{ id: string }> | null | undefined;
  units?.forEach((unit) => {
    lines.push(`    <UnitRef dt:GUID="${escapeXml(unit.id)}" />`);
  });

  const quantityKinds = (property as any).quantityKinds as Array<{ id: string }> | null | undefined;
  quantityKinds?.forEach((quantityKind) => {
    lines.push(`    <QuantityKindRef dt:GUID="${escapeXml(quantityKind.id)}" />`);
  });

  const connectedProperties = (property as any).connectedProperties as Array<any> | null | undefined;
  let specializationAdded = false;
  connectedProperties?.forEach((relation) => {
    const relationType = relation?.relationshipType;
    const targetProperties = relation?.targetProperties ?? [];

    if (relationType === "XTD_DEPENDS") {
      targetProperties.forEach((target: { id: string }) => {
        lines.push(`    <IsDependentOnRef dt:GUID="${escapeXml(target.id)}" />`);
      });
    }

    if (relationType === "XTD_SPECIALIZES" && !specializationAdded) {
      const firstTarget = targetProperties[0];
      if (firstTarget?.id) {
        lines.push(`    <IsSpecializationOfRef dt:GUID="${escapeXml(firstTarget.id)}" />`);
        specializationAdded = true;
      }
    }
  });

  lines.push(`  </Property>`);

  return lines;
}

function renderConceptFields(
  entry: SubjectExportNode,
  lines: string[]
): void {
  const nameTexts = ensureTextOrEmpty(collectTexts(entry.names ?? []), entry.name ?? "");
  const definitionTexts = collectTexts(entry.definition ? [entry.definition] : []);
  const descriptionTexts = collectTexts(entry.descriptions ?? []);
  const exampleTexts = collectTexts(entry.examples ?? []);

  lines.push(...renderMultiLangElements("Name", nameTexts));
  lines.push(
    renderSingleDefinition(
      definitionTexts.length > 0
        ? definitionTexts
        : [{ language: DEFAULT_LANGUAGE, text: "" }]
    )
  );
  if (descriptionTexts.length > 0) {
    lines.push(...renderMultiLangElements("Description", descriptionTexts));
  }

  if (exampleTexts.length > 0) {
    lines.push(...renderMultiLangElements("Example", exampleTexts));
  }

  if (entry.languageOfCreator?.code) {
    lines.push(`    <LanguageOfCreator>${escapeXml(entry.languageOfCreator.code)}</LanguageOfCreator>`);
  }

  if (entry.countryOfOrigin?.code) {
    lines.push(`    <CountryOfOrigin>${escapeXml(entry.countryOfOrigin.code)}</CountryOfOrigin>`);
  }

  if (entry.majorVersion !== null && entry.majorVersion !== undefined) {
    lines.push(`    <MajorVersion>${entry.majorVersion}</MajorVersion>`);
  }

  if (entry.minorVersion !== null && entry.minorVersion !== undefined) {
    lines.push(`    <MinorVersion>${entry.minorVersion}</MinorVersion>`);
  }

  if (entry.status) {
    lines.push(`    <Status>${escapeXml(stripXtdPrefix(entry.status))}</Status>`);
  }

  (entry.referenceDocuments ?? []).forEach((doc) => {
    lines.push(`    <ReferenceDocumentRef dt:GUID="${escapeXml(doc.id)}" />`);
  });
}

function getTargetsByRelation(
  entry: SubjectExportNode,
  relationName: string
) {
  return (entry.connectedSubjects ?? [])
    .filter((relation) =>
      (relation.relationshipType?.name || "").toLowerCase() === relationName
    )
    .flatMap((relation) => relation.targetSubjects ?? []);
}

function getTargetsByReverseRelation(
  entry: SubjectExportNode,
  relationName: string
) {
  return (entry.connectingSubjects ?? [])
    .filter((relation) =>
    (relation.relationshipType?.name || "").toLowerCase() === relationName
    )
    .flatMap((relation) => relation.connectingSubject ?? []);
}

function createDataTemplateXml(entry: SubjectExportNode): string[] {
  const lines: string[] = [
    `  <DataTemplate dt:GUID="${escapeXml(entry.id)}" dateOfCreation="${escapeXml(getDateOfCreation(entry))}">`,
  ];

  renderConceptFields(entry, lines);

  const objectTypeTargets = getTargetsByRelation(entry, "hasobjecttype");
  const propertyGroupTargets = getTargetsByRelation(entry, "haspropertygroup");
  const hasPartTargets = getTargetsByReverseRelation(entry, "partof");
  const isSubtypeTargets = getTargetsByReverseRelation(entry, "specializes");

    hasPartTargets.forEach((target) => {
    lines.push(`    <HasPartRef dt:GUID="${escapeXml(target.id)}" />`);
  });

  isSubtypeTargets.forEach((target) => {
    lines.push(`    <IsSubtypeOfRef dt:GUID="${escapeXml(target.id)}" />`);
  });

  objectTypeTargets.forEach((target) => {
    lines.push(`    <HasObjectTypeRef dt:GUID="${escapeXml(target.id)}" />`);
  });

  (entry.properties ?? []).forEach((property) => {
    lines.push(`    <HasPropertyRef dt:GUID="${escapeXml(property.id)}" />`);
  });

  propertyGroupTargets.forEach((target) => {
    lines.push(`    <HasGroupOfPropertiesRef dt:GUID="${escapeXml(target.id)}" />`);
  });

  lines.push(`  </DataTemplate>`);
  return lines;
}

export function generateDataTemplateXml(
  entry: SubjectDetailPropsFragment,
  context?: ExportContext,
): string {

  const libraryNameTexts = ensureTextOrEmpty(collectTexts(entry.names), entry.name ?? "");

  const objectTypeTargets = getTargetsByRelation(entry, "hasobjecttype");
  const propertyGroupTargets = getTargetsByRelation(entry, "haspropertygroup");
  const hasPartTargets = getTargetsByReverseRelation(entry, "partof");
  const isSubtypeTargets = getTargetsByReverseRelation(entry, "specializes");

  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<Library xmlns="https://standards.iso.org/iso/23387/ed-2/en/"',
    '         xmlns:dt="https://standards.iso.org/iso/23387/ed-2/en/"',
    '         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '         xsi:schemaLocation="https://standards.iso.org/iso/23387/ed-2/en/ https://standards.iso.org/iso/23387/ed-2/en/ISO_23387_AnnexE_XSD.xsd"',
    `         dt:GUID="${escapeXml(entry.id)}">`,
    ...renderMultiLangElements("Name", libraryNameTexts),
  ];

  lines.push(...createDataTemplateXml(entry));

  const subjectsById = context?.subjectsById ?? {};
  const documentsById = context?.documentsById ?? {};
  const dimensionsById = context?.dimensionsById ?? {};
  const propertiesById = context?.propertiesById ?? {};
  const quantityKindsById = context?.quantityKindsById ?? {};
  const unitsById = context?.unitsById ?? {};

  const groupSubjects = propertyGroupTargets
    .map((group) => (subjectsById[group.id] ?? group) as SubjectExportNode)
    .filter((group): group is SubjectExportNode => {
      if (!group || typeof group !== "object") return false;
      if (!("properties" in group)) return false;
      return ((group as SubjectExportNode).properties ?? []).length > 0;
    });

  const allPropertyIds = new Set<string>();
  (entry.properties ?? []).forEach((property) => {
    allPropertyIds.add(property.id);
  });
  groupSubjects.forEach((group) => {
    (group.properties ?? []).forEach((property) => {
      allPropertyIds.add(property.id);
    });
  });

  groupSubjects.forEach((group) => {
    lines.push(...createGroupOfPropertiesXml(group));
  });

  objectTypeTargets.forEach((target) => {
    const subject = subjectsById[target.id] ?? target;
    lines.push(...createObjectTypeXml(subject));
  });

  [...hasPartTargets, ...isSubtypeTargets].forEach((target) => {
    const subject = subjectsById[target.id];
    if (subject) {
      lines.push(...createDataTemplateXml(subject));
    }
  });

  (entry.referenceDocuments ?? []).forEach((doc) => {
    const detailedDoc = documentsById[doc.id];
    lines.push(...createReferenceDocumentXml(detailedDoc, doc.name ?? "", doc.id));
  });

  allPropertyIds.forEach((propertyId) => {
    const detailedProperty = propertiesById[propertyId];
    console.log(detailedProperty);
    if (detailedProperty) {
      lines.push(
        ...createPropertyXml(
          detailedProperty,
          context?.valueListValuesById
        )
      );
    }
  });

  const unitIds = new Set<string>();
  const dimensionIds = new Set<string>();
  const quantityKindIds = new Set<string>();
  Object.values(propertiesById).forEach((property) => {
    (property.units ?? []).forEach((unit) => {
      unitIds.add(unit.id);
    });
    if (property.dimension?.id) {
      dimensionIds.add(property.dimension.id);
    }
    (property.quantityKinds ?? []).forEach((quantityKind) => {
      quantityKindIds.add(quantityKind.id);
    });
  });

  unitIds.forEach((unitId) => {
    const unit = unitsById[unitId];
    if (unit) {
      lines.push(...createUnitXml(unit));
    }
  });

  dimensionIds.forEach((dimensionId) => {
    const dimension = dimensionsById[dimensionId];
    if (dimension) {
      lines.push(...createDimensionXml(dimension));
    }
  });

  quantityKindIds.forEach((quantityKindId) => {
    const quantityKind = quantityKindsById[quantityKindId];
    if (quantityKind) {
      lines.push(...createQuantityKindXml(quantityKind));
    }
  });

  lines.push(`</Library>`);
  return lines.join("\n");
}

export function generateDataTemplateFilename(entry: SubjectDetailPropsFragment): string {
  const nameTexts = collectTexts(entry.names);
  const baseName = nameTexts[0]?.text || entry.name || "DataTemplate";
  let filename = baseName.trim();

  if (!filename) {
    filename = "DataTemplate";
  }

  filename = filename
    .replace(/Ä/g, "Ae")
    .replace(/Ö/g, "Oe")
    .replace(/Ü/g, "Ue")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
  filename = filename.replace(/[<>:"/\\|?*\x00-\x1F]/g, "");
  filename = filename.replace(/\s+/g, "_");
  filename = filename.replace(/[. ]+$/g, "");

  if (!filename) {
    filename = "DataTemplate";
  }

  return `${filename}.xml`;
}

export function downloadXmlFile(xml: string, filename: string): void {
  const blob = new Blob([xml], { type: "application/xml" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
