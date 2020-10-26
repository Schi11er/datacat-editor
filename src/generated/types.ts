import * as Apollo from '@apollo/client';
import {gql} from '@apollo/client';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type AccountFilterInput = {
  query?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Scalars['Boolean']>;
  credentialsExpired?: Maybe<Scalars['Boolean']>;
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export enum AccountStatus {
  Admin = 'Admin',
  Verified = 'Verified',
  Unverified = 'Unverified'
}

export type AccountStatusUpdateInput = {
  username: Scalars['ID'];
  status: AccountStatus;
};

export type AccountUpdateInput = {
  username: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  organization: Scalars['String'];
};

export type AddDescriptionInput = {
  entryId: Scalars['ID'];
  description: TranslationInput;
};


export type AddNameInput = {
  entryId: Scalars['ID'];
  name: TranslationInput;
};





export type CreateEntryInput = {
  entryType: EntryType;
  properties: PropertiesInput;
  tags?: Maybe<Array<Scalars['ID']>>;
};


export type CreateOneToManyRelationshipInput = {
  relationshipType: OneToManyRelationshipType;
  properties?: Maybe<PropertiesInput>;
  from: Scalars['ID'];
  to: Array<Scalars['ID']>;
};


export type CreateOneToOneRelationshipInput = {
  relationshipType: OneToOneRelationshipType;
  properties?: Maybe<PropertiesInput>;
  from: Scalars['ID'];
  to: Scalars['ID'];
};


export type CreateQualifiedOneToOneRelationshipInput = {
  relationshipType: QualifiedOneToOneRelationshipType;
  properties?: Maybe<PropertiesInput>;
  from: Scalars['ID'];
  to: Scalars['ID'];
  with: Array<Scalars['ID']>;
};


export type DeleteDescriptionInput = {
  entryId: Scalars['ID'];
  descriptionId: Scalars['ID'];
};


export type DeleteEntryInput = {
  id: Scalars['ID'];
};


export type DeleteNameInput = {
  entryId: Scalars['ID'];
  nameId: Scalars['ID'];
};


export type DeleteRelationshipInput = {
  id: Scalars['ID'];
};



/**  inputs */
export enum EntityTypes {
  XtdExternalDocument = 'XtdExternalDocument',
  XtdRoot = 'XtdRoot',
  XtdObject = 'XtdObject',
  XtdActivity = 'XtdActivity',
  XtdActor = 'XtdActor',
  XtdClassification = 'XtdClassification',
  XtdMeasureWithUnit = 'XtdMeasureWithUnit',
  XtdProperty = 'XtdProperty',
  XtdSubject = 'XtdSubject',
  XtdUnit = 'XtdUnit',
  XtdValue = 'XtdValue',
  XtdCollection = 'XtdCollection',
  XtdBag = 'XtdBag',
  XtdNest = 'XtdNest',
  XtdRelationship = 'XtdRelationship',
  XtdRelActsUpon = 'XtdRelActsUpon',
  XtdRelAssignsCollections = 'XtdRelAssignsCollections',
  XtdRelAssignsMeasures = 'XtdRelAssignsMeasures',
  XtdRelAssignsProperties = 'XtdRelAssignsProperties',
  XtdRelAssignsPropertyWithValues = 'XtdRelAssignsPropertyWithValues',
  XtdRelAssignsUnit = 'XtdRelAssignsUnit',
  XtdRelAssignsValues = 'XtdRelAssignsValues',
  XtdRelAssociates = 'XtdRelAssociates',
  XtdRelClassifies = 'XtdRelClassifies',
  XtdRelCollects = 'XtdRelCollects',
  XtdRelComposes = 'XtdRelComposes',
  XtdRelDocuments = 'XtdRelDocuments',
  XtdRelGroups = 'XtdRelGroups',
  XtdRelSequences = 'XtdRelSequences',
  XtdRelSpecializes = 'XtdRelSpecializes'
}


export type EntryFilterInput = {
  entryType?: Maybe<EntryTypeFilterInput>;
  tags?: Maybe<TagFilterInput>;
};

export enum EntryType {
  Actor = 'Actor',
  Activity = 'Activity',
  Bag = 'Bag',
  Classification = 'Classification',
  ExternalDocument = 'ExternalDocument',
  Measure = 'Measure',
  Nest = 'Nest',
  Subject = 'Subject',
  Property = 'Property',
  Unit = 'Unit',
  Value = 'Value'
}

export type EntryTypeFilterInput = {
  in?: Maybe<Array<EntryType>>;
};

export type FilterInput = {
  query?: Maybe<Scalars['String']>;
  idIn?: Maybe<Array<Scalars['ID']>>;
  idNotIn?: Maybe<Array<Scalars['ID']>>;
  tagged?: Maybe<Array<Scalars['ID']>>;
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type HierarchyFilterInput = {
  rootNodeFilter: HierarchyRootNodeFilterInput;
};


export type HierarchyRootNodeFilterInput = {
  entryTypeIn?: Maybe<Array<EntryType>>;
  entryTypeNotIn?: Maybe<Array<EntryType>>;
  idIn?: Maybe<Array<Scalars['ID']>>;
  idNotIn?: Maybe<Array<Scalars['ID']>>;
  tagged?: Maybe<Array<Scalars['ID']>>;
};



/**  Query type */
export type LanguageFilterInput = {
  query?: Maybe<Scalars['String']>;
  excludeLanguageTags?: Maybe<Array<Scalars['String']>>;
};

export type LocaleInput = {
  languageTag: Scalars['ID'];
};

export type LocalizationInput = {
  languageTags?: Maybe<Array<Scalars['String']>>;
};


export type LocalizedTextInput = {
  languageTag: Scalars['String'];
  text: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['ID'];
  password: Scalars['String'];
};



export enum OneToManyRelationshipType {
  ActsUpon = 'ActsUpon',
  AssignsCollections = 'AssignsCollections',
  AssignsMeasures = 'AssignsMeasures',
  AssignsProperties = 'AssignsProperties',
  AssignsUnits = 'AssignsUnits',
  AssignsValues = 'AssignsValues',
  Associates = 'Associates',
  Collects = 'Collects',
  Composes = 'Composes',
  Documents = 'Documents',
  Groups = 'Groups',
  Specializes = 'Specializes'
}


export enum OneToOneRelationshipType {
  Sequences = 'Sequences'
}



export type ProfileUpdateInput = {
  username: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  organization: Scalars['String'];
};

export type PropertiesInput = {
  id?: Maybe<Scalars['ID']>;
  version?: Maybe<VersionInput>;
  names: Array<TranslationInput>;
  descriptions?: Maybe<Array<TranslationInput>>;
};


export enum QualifiedOneToOneRelationshipType {
  AssignsPropertyWithValues = 'AssignsPropertyWithValues'
}



export type SearchInput = {
  query?: Maybe<Scalars['String']>;
  filters?: Maybe<Array<EntryFilterInput>>;
  entityTypeIn?: Maybe<Array<EntityTypes>>;
  entityTypeNotIn?: Maybe<Array<EntityTypes>>;
  idIn?: Maybe<Array<Scalars['ID']>>;
  idNotIn?: Maybe<Array<Scalars['ID']>>;
  tagged?: Maybe<Array<Scalars['ID']>>;
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};


export type SetNominalValueInput = {
  id: Scalars['ID'];
  valueRole: ValueRole;
  valueType: ValueType;
  nominalValue?: Maybe<Scalars['String']>;
};


export type SetToleranceInput = {
  id: Scalars['ID'];
  toleranceType: ToleranceType;
  lowerTolerance?: Maybe<Scalars['String']>;
  upperTolerance?: Maybe<Scalars['String']>;
};


export type SetVersionInput = {
  id: Scalars['ID'];
  version: VersionInput;
};


export type SignupInput = {
  username: Scalars['ID'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  organization: Scalars['String'];
};



export type TagFilterInput = {
  in?: Maybe<Array<Scalars['ID']>>;
};

export type TagInput = {
  scope?: Maybe<Scalars['String']>;
  names: Array<LocalizedTextInput>;
  descriptions?: Maybe<Array<LocalizedTextInput>>;
};

export enum ToleranceType {
  Realvalue = 'Realvalue',
  Percentage = 'Percentage'
}


export type TranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageTag: Scalars['ID'];
  value: Scalars['String'];
};

export type TranslationUpdateInput = {
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type UnsetNominalValueInput = {
  id: Scalars['ID'];
};


export type UnsetToleranceInput = {
  id: Scalars['ID'];
};


export type UpdateDescriptionInput = {
  entryId: Scalars['ID'];
  description: TranslationUpdateInput;
};


export type UpdateNameInput = {
  entryId: Scalars['ID'];
  name: TranslationUpdateInput;
};


export enum ValueRole {
  Nominal = 'Nominal',
  Maximum = 'Maximum',
  Minimum = 'Minimum'
}

export enum ValueType {
  String = 'String',
  Number = 'Number',
  Integer = 'Integer',
  Real = 'Real',
  Boolean = 'Boolean',
  Logical = 'Logical'
}

export type VersionInput = {
  versionId?: Maybe<Scalars['String']>;
  versionDate?: Maybe<Scalars['String']>;
};
























































export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmEmailMutation = { __typename: 'Mutation', success?: Maybe<boolean> };

export type LoginFormMutationVariables = Exact<{
  credentials: LoginInput;
}>;


export type LoginFormMutation = { __typename: 'Mutation', token?: Maybe<string> };

type SearchResult_XtdActivity_Fragment = { __typename: 'XtdActivity', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdActor_Fragment = { __typename: 'XtdActor', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdBag_Fragment = { __typename: 'XtdBag', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdClassification_Fragment = { __typename: 'XtdClassification', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdExternalDocument_Fragment = { __typename: 'XtdExternalDocument', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdMeasureWithUnit_Fragment = { __typename: 'XtdMeasureWithUnit', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdNest_Fragment = { __typename: 'XtdNest', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdProperty_Fragment = { __typename: 'XtdProperty', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelActsUpon_Fragment = { __typename: 'XtdRelActsUpon', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelAssignsCollections_Fragment = { __typename: 'XtdRelAssignsCollections', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelAssignsMeasures_Fragment = { __typename: 'XtdRelAssignsMeasures', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelAssignsProperties_Fragment = { __typename: 'XtdRelAssignsProperties', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelAssignsPropertyWithValues_Fragment = { __typename: 'XtdRelAssignsPropertyWithValues', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelAssignsUnits_Fragment = { __typename: 'XtdRelAssignsUnits', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelAssignsValues_Fragment = { __typename: 'XtdRelAssignsValues', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelAssociates_Fragment = { __typename: 'XtdRelAssociates', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelCollects_Fragment = { __typename: 'XtdRelCollects', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelComposes_Fragment = { __typename: 'XtdRelComposes', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelDocuments_Fragment = { __typename: 'XtdRelDocuments', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelGroups_Fragment = { __typename: 'XtdRelGroups', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelSequences_Fragment = { __typename: 'XtdRelSequences', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdRelSpecializes_Fragment = { __typename: 'XtdRelSpecializes', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdSubject_Fragment = { __typename: 'XtdSubject', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdUnit_Fragment = { __typename: 'XtdUnit', id: string, name?: Maybe<string>, description?: Maybe<string> };

type SearchResult_XtdValue_Fragment = { __typename: 'XtdValue', id: string, name?: Maybe<string>, description?: Maybe<string> };

export type SearchResultFragment = SearchResult_XtdActivity_Fragment | SearchResult_XtdActor_Fragment | SearchResult_XtdBag_Fragment | SearchResult_XtdClassification_Fragment | SearchResult_XtdExternalDocument_Fragment | SearchResult_XtdMeasureWithUnit_Fragment | SearchResult_XtdNest_Fragment | SearchResult_XtdProperty_Fragment | SearchResult_XtdRelActsUpon_Fragment | SearchResult_XtdRelAssignsCollections_Fragment | SearchResult_XtdRelAssignsMeasures_Fragment | SearchResult_XtdRelAssignsProperties_Fragment | SearchResult_XtdRelAssignsPropertyWithValues_Fragment | SearchResult_XtdRelAssignsUnits_Fragment | SearchResult_XtdRelAssignsValues_Fragment | SearchResult_XtdRelAssociates_Fragment | SearchResult_XtdRelCollects_Fragment | SearchResult_XtdRelComposes_Fragment | SearchResult_XtdRelDocuments_Fragment | SearchResult_XtdRelGroups_Fragment | SearchResult_XtdRelSequences_Fragment | SearchResult_XtdRelSpecializes_Fragment | SearchResult_XtdSubject_Fragment | SearchResult_XtdUnit_Fragment | SearchResult_XtdValue_Fragment;

export type SearchInputQueryVariables = Exact<{
  input?: Maybe<SearchInput>;
}>;


export type SearchInputQuery = { __typename: 'Query', search: { __typename: 'SearchResultConnection', totalElements: number, nodes: Array<(
      { __typename: 'XtdActivity' }
      & SearchResult_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdActor' }
      & SearchResult_XtdActor_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & SearchResult_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & SearchResult_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & SearchResult_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & SearchResult_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & SearchResult_XtdNest_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & SearchResult_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdRelActsUpon' }
      & SearchResult_XtdRelActsUpon_Fragment
    ) | (
      { __typename: 'XtdRelAssignsCollections' }
      & SearchResult_XtdRelAssignsCollections_Fragment
    ) | (
      { __typename: 'XtdRelAssignsMeasures' }
      & SearchResult_XtdRelAssignsMeasures_Fragment
    ) | (
      { __typename: 'XtdRelAssignsProperties' }
      & SearchResult_XtdRelAssignsProperties_Fragment
    ) | (
      { __typename: 'XtdRelAssignsPropertyWithValues' }
      & SearchResult_XtdRelAssignsPropertyWithValues_Fragment
    ) | (
      { __typename: 'XtdRelAssignsUnits' }
      & SearchResult_XtdRelAssignsUnits_Fragment
    ) | (
      { __typename: 'XtdRelAssignsValues' }
      & SearchResult_XtdRelAssignsValues_Fragment
    ) | (
      { __typename: 'XtdRelAssociates' }
      & SearchResult_XtdRelAssociates_Fragment
    ) | (
      { __typename: 'XtdRelCollects' }
      & SearchResult_XtdRelCollects_Fragment
    ) | (
      { __typename: 'XtdRelComposes' }
      & SearchResult_XtdRelComposes_Fragment
    ) | (
      { __typename: 'XtdRelDocuments' }
      & SearchResult_XtdRelDocuments_Fragment
    ) | (
      { __typename: 'XtdRelGroups' }
      & SearchResult_XtdRelGroups_Fragment
    ) | (
      { __typename: 'XtdRelSequences' }
      & SearchResult_XtdRelSequences_Fragment
    ) | (
      { __typename: 'XtdRelSpecializes' }
      & SearchResult_XtdRelSpecializes_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & SearchResult_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & SearchResult_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & SearchResult_XtdValue_Fragment
    )>, pageInfo: (
      { __typename: 'PageInfo' }
      & PagePropsFragment
    ) } };

export type SignupFormMutationVariables = Exact<{
  profile: SignupInput;
}>;


export type SignupFormMutation = { __typename: 'Mutation', success?: Maybe<boolean> };

type DomainClassProps_XtdActivity_Fragment = { __typename: 'XtdActivity', id: string, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )> };

type DomainClassProps_XtdActor_Fragment = { __typename: 'XtdActor', id: string, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )> };

type DomainClassProps_XtdClassification_Fragment = { __typename: 'XtdClassification', id: string, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )> };

type DomainClassProps_XtdMeasureWithUnit_Fragment = { __typename: 'XtdMeasureWithUnit', id: string, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )> };

type DomainClassProps_XtdProperty_Fragment = { __typename: 'XtdProperty', id: string, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )> };

type DomainClassProps_XtdSubject_Fragment = { __typename: 'XtdSubject', id: string, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )> };

type DomainClassProps_XtdUnit_Fragment = { __typename: 'XtdUnit', id: string, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )> };

type DomainClassProps_XtdValue_Fragment = { __typename: 'XtdValue', id: string, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )> };

export type DomainClassPropsFragment = DomainClassProps_XtdActivity_Fragment | DomainClassProps_XtdActor_Fragment | DomainClassProps_XtdClassification_Fragment | DomainClassProps_XtdMeasureWithUnit_Fragment | DomainClassProps_XtdProperty_Fragment | DomainClassProps_XtdSubject_Fragment | DomainClassProps_XtdUnit_Fragment | DomainClassProps_XtdValue_Fragment;

type DomainClassDetails_XtdActivity_Fragment = (
  { __typename: 'XtdActivity' }
  & DomainClassProps_XtdActivity_Fragment
);

type DomainClassDetails_XtdActor_Fragment = (
  { __typename: 'XtdActor' }
  & DomainClassProps_XtdActor_Fragment
);

type DomainClassDetails_XtdClassification_Fragment = (
  { __typename: 'XtdClassification' }
  & DomainClassProps_XtdClassification_Fragment
);

type DomainClassDetails_XtdMeasureWithUnit_Fragment = (
  { __typename: 'XtdMeasureWithUnit' }
  & DomainClassProps_XtdMeasureWithUnit_Fragment
);

type DomainClassDetails_XtdProperty_Fragment = (
  { __typename: 'XtdProperty' }
  & DomainClassProps_XtdProperty_Fragment
);

type DomainClassDetails_XtdSubject_Fragment = (
  { __typename: 'XtdSubject' }
  & DomainClassProps_XtdSubject_Fragment
);

type DomainClassDetails_XtdUnit_Fragment = (
  { __typename: 'XtdUnit' }
  & DomainClassProps_XtdUnit_Fragment
);

type DomainClassDetails_XtdValue_Fragment = (
  { __typename: 'XtdValue' }
  & DomainClassProps_XtdValue_Fragment
);

export type DomainClassDetailsFragment = DomainClassDetails_XtdActivity_Fragment | DomainClassDetails_XtdActor_Fragment | DomainClassDetails_XtdClassification_Fragment | DomainClassDetails_XtdMeasureWithUnit_Fragment | DomainClassDetails_XtdProperty_Fragment | DomainClassDetails_XtdSubject_Fragment | DomainClassDetails_XtdUnit_Fragment | DomainClassDetails_XtdValue_Fragment;

export type DomainClassQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DomainClassQuery = { __typename: 'Query', node?: Maybe<(
    { __typename: 'XtdActivity' }
    & DomainClassDetails_XtdActivity_Fragment
  ) | (
    { __typename: 'XtdActor' }
    & DomainClassDetails_XtdActor_Fragment
  ) | { __typename: 'XtdBag' } | (
    { __typename: 'XtdClassification' }
    & DomainClassDetails_XtdClassification_Fragment
  ) | { __typename: 'XtdExternalDocument' } | (
    { __typename: 'XtdMeasureWithUnit' }
    & DomainClassDetails_XtdMeasureWithUnit_Fragment
  ) | { __typename: 'XtdNest' } | (
    { __typename: 'XtdProperty' }
    & DomainClassDetails_XtdProperty_Fragment
  ) | { __typename: 'XtdRelActsUpon' } | { __typename: 'XtdRelAssignsCollections' } | { __typename: 'XtdRelAssignsMeasures' } | { __typename: 'XtdRelAssignsProperties' } | { __typename: 'XtdRelAssignsPropertyWithValues' } | { __typename: 'XtdRelAssignsUnits' } | { __typename: 'XtdRelAssignsValues' } | { __typename: 'XtdRelAssociates' } | { __typename: 'XtdRelCollects' } | { __typename: 'XtdRelComposes' } | { __typename: 'XtdRelDocuments' } | { __typename: 'XtdRelGroups' } | { __typename: 'XtdRelSequences' } | { __typename: 'XtdRelSpecializes' } | (
    { __typename: 'XtdSubject' }
    & DomainClassDetails_XtdSubject_Fragment
  ) | (
    { __typename: 'XtdUnit' }
    & DomainClassDetails_XtdUnit_Fragment
  ) | (
    { __typename: 'XtdValue' }
    & DomainClassDetails_XtdValue_Fragment
  )> };

export type DomainClassListQueryVariables = Exact<{
  input?: Maybe<SearchInput>;
}>;


export type DomainClassListQuery = { __typename: 'Query', search: { __typename: 'SearchResultConnection', totalElements: number, nodes: Array<(
      { __typename: 'XtdActivity' }
      & DomainClassProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdActor' }
      & DomainClassProps_XtdActor_Fragment
    ) | { __typename: 'XtdBag' } | (
      { __typename: 'XtdClassification' }
      & DomainClassProps_XtdClassification_Fragment
    ) | { __typename: 'XtdExternalDocument' } | (
      { __typename: 'XtdMeasureWithUnit' }
      & DomainClassProps_XtdMeasureWithUnit_Fragment
    ) | { __typename: 'XtdNest' } | (
      { __typename: 'XtdProperty' }
      & DomainClassProps_XtdProperty_Fragment
    ) | { __typename: 'XtdRelActsUpon' } | { __typename: 'XtdRelAssignsCollections' } | { __typename: 'XtdRelAssignsMeasures' } | { __typename: 'XtdRelAssignsProperties' } | { __typename: 'XtdRelAssignsPropertyWithValues' } | { __typename: 'XtdRelAssignsUnits' } | { __typename: 'XtdRelAssignsValues' } | { __typename: 'XtdRelAssociates' } | { __typename: 'XtdRelCollects' } | { __typename: 'XtdRelComposes' } | { __typename: 'XtdRelDocuments' } | { __typename: 'XtdRelGroups' } | { __typename: 'XtdRelSequences' } | { __typename: 'XtdRelSpecializes' } | (
      { __typename: 'XtdSubject' }
      & DomainClassProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & DomainClassProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & DomainClassProps_XtdValue_Fragment
    )>, pageInfo: { __typename: 'PageInfo', totalPages: number, pageNumber: number, hasNext: boolean, hasPrevious: boolean } } };

export type TagDomainClassMutationVariables = Exact<{
  domainModelId: Scalars['ID'];
  tagId: Scalars['ID'];
}>;


export type TagDomainClassMutation = { __typename: 'Mutation', tag: (
    { __typename: 'XtdActivity' }
    & DomainClassDetails_XtdActivity_Fragment
  ) | (
    { __typename: 'XtdActor' }
    & DomainClassDetails_XtdActor_Fragment
  ) | { __typename: 'XtdBag' } | (
    { __typename: 'XtdClassification' }
    & DomainClassDetails_XtdClassification_Fragment
  ) | { __typename: 'XtdExternalDocument' } | (
    { __typename: 'XtdMeasureWithUnit' }
    & DomainClassDetails_XtdMeasureWithUnit_Fragment
  ) | { __typename: 'XtdNest' } | (
    { __typename: 'XtdProperty' }
    & DomainClassDetails_XtdProperty_Fragment
  ) | { __typename: 'XtdRelActsUpon' } | { __typename: 'XtdRelAssignsCollections' } | { __typename: 'XtdRelAssignsMeasures' } | { __typename: 'XtdRelAssignsProperties' } | { __typename: 'XtdRelAssignsPropertyWithValues' } | { __typename: 'XtdRelAssignsUnits' } | { __typename: 'XtdRelAssignsValues' } | { __typename: 'XtdRelAssociates' } | { __typename: 'XtdRelCollects' } | { __typename: 'XtdRelComposes' } | { __typename: 'XtdRelDocuments' } | { __typename: 'XtdRelGroups' } | { __typename: 'XtdRelSequences' } | { __typename: 'XtdRelSpecializes' } | (
    { __typename: 'XtdSubject' }
    & DomainClassDetails_XtdSubject_Fragment
  ) | (
    { __typename: 'XtdUnit' }
    & DomainClassDetails_XtdUnit_Fragment
  ) | (
    { __typename: 'XtdValue' }
    & DomainClassDetails_XtdValue_Fragment
  ) };

export type DomainGroupPropsFragment = { __typename: 'XtdBag', id: string, created: string, createdBy: string, lastModified: string, lastModifiedBy: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<{ __typename: 'Tag', id: string, localizedName: string }> };

export type DomainGroupDetailsFragment = (
  { __typename: 'XtdBag', collects: { __typename: 'XtdRelCollectsConnection', nodes: Array<{ __typename: 'XtdRelCollects', id: string, relatedThings: Array<{ __typename: 'XtdActivity', id: string, name?: Maybe<string> } | { __typename: 'XtdActor', id: string, name?: Maybe<string> } | { __typename: 'XtdBag', id: string, name?: Maybe<string> } | { __typename: 'XtdClassification', id: string, name?: Maybe<string> } | { __typename: 'XtdMeasureWithUnit', id: string, name?: Maybe<string> } | { __typename: 'XtdNest', id: string, name?: Maybe<string> } | { __typename: 'XtdProperty', id: string, name?: Maybe<string> } | { __typename: 'XtdSubject', id: string, name?: Maybe<string> } | { __typename: 'XtdUnit', id: string, name?: Maybe<string> } | { __typename: 'XtdValue', id: string, name?: Maybe<string> }> }> } }
  & DomainGroupPropsFragment
);

export type DomainGroupQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DomainGroupQuery = { __typename: 'Query', node?: Maybe<{ __typename: 'XtdActivity' } | { __typename: 'XtdActor' } | (
    { __typename: 'XtdBag' }
    & DomainGroupDetailsFragment
  ) | { __typename: 'XtdClassification' } | { __typename: 'XtdExternalDocument' } | { __typename: 'XtdMeasureWithUnit' } | { __typename: 'XtdNest' } | { __typename: 'XtdProperty' } | { __typename: 'XtdRelActsUpon' } | { __typename: 'XtdRelAssignsCollections' } | { __typename: 'XtdRelAssignsMeasures' } | { __typename: 'XtdRelAssignsProperties' } | { __typename: 'XtdRelAssignsPropertyWithValues' } | { __typename: 'XtdRelAssignsUnits' } | { __typename: 'XtdRelAssignsValues' } | { __typename: 'XtdRelAssociates' } | { __typename: 'XtdRelCollects' } | { __typename: 'XtdRelComposes' } | { __typename: 'XtdRelDocuments' } | { __typename: 'XtdRelGroups' } | { __typename: 'XtdRelSequences' } | { __typename: 'XtdRelSpecializes' } | { __typename: 'XtdSubject' } | { __typename: 'XtdUnit' } | { __typename: 'XtdValue' }> };

export type DomainGroupListQueryVariables = Exact<{
  input?: Maybe<FilterInput>;
}>;


export type DomainGroupListQuery = { __typename: 'Query', bags: { __typename: 'XtdBagConnection', totalElements: number, nodes: Array<(
      { __typename: 'XtdBag' }
      & DomainGroupPropsFragment
    )>, pageInfo: { __typename: 'PageInfo', totalPages: number, pageNumber: number, hasNext: boolean, hasPrevious: boolean } } };

export type TagDomainGroupMutationVariables = Exact<{
  domainModelId: Scalars['ID'];
  tagId: Scalars['ID'];
}>;


export type TagDomainGroupMutation = { __typename: 'Mutation', tag: { __typename: 'XtdActivity' } | { __typename: 'XtdActor' } | (
    { __typename: 'XtdBag' }
    & DomainGroupDetailsFragment
  ) | { __typename: 'XtdClassification' } | { __typename: 'XtdExternalDocument' } | { __typename: 'XtdMeasureWithUnit' } | { __typename: 'XtdNest' } | { __typename: 'XtdProperty' } | { __typename: 'XtdRelActsUpon' } | { __typename: 'XtdRelAssignsCollections' } | { __typename: 'XtdRelAssignsMeasures' } | { __typename: 'XtdRelAssignsProperties' } | { __typename: 'XtdRelAssignsPropertyWithValues' } | { __typename: 'XtdRelAssignsUnits' } | { __typename: 'XtdRelAssignsValues' } | { __typename: 'XtdRelAssociates' } | { __typename: 'XtdRelCollects' } | { __typename: 'XtdRelComposes' } | { __typename: 'XtdRelDocuments' } | { __typename: 'XtdRelGroups' } | { __typename: 'XtdRelSequences' } | { __typename: 'XtdRelSpecializes' } | { __typename: 'XtdSubject' } | { __typename: 'XtdUnit' } | { __typename: 'XtdValue' } };

export type UserProfileFragment = { __typename: 'Profile', username: string, firstName: string, lastName: string, email: string, organization: string };

export type PagePropsFragment = { __typename: 'PageInfo', totalPages: number, pageNumber: number, hasNext: boolean, hasPrevious: boolean };

export type LanguagePropsFragment = { __typename: 'Language', id: string, languageTag: string, displayCountry: string, displayLanguage: string };

export type TranslationPropsFragment = { __typename: 'Translation', id: string, value: string, language: (
    { __typename: 'Language' }
    & LanguagePropsFragment
  ) };

export type TagPropsFragment = { __typename: 'Tag', id: string, localizedName: string, localizedDescription?: Maybe<string> };

type SearchResultProps_XtdActivity_Fragment = { __typename: 'XtdActivity', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdActor_Fragment = { __typename: 'XtdActor', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdBag_Fragment = { __typename: 'XtdBag', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdClassification_Fragment = { __typename: 'XtdClassification', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdExternalDocument_Fragment = { __typename: 'XtdExternalDocument', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdMeasureWithUnit_Fragment = { __typename: 'XtdMeasureWithUnit', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdNest_Fragment = { __typename: 'XtdNest', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdProperty_Fragment = { __typename: 'XtdProperty', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelActsUpon_Fragment = { __typename: 'XtdRelActsUpon', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelAssignsCollections_Fragment = { __typename: 'XtdRelAssignsCollections', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelAssignsMeasures_Fragment = { __typename: 'XtdRelAssignsMeasures', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelAssignsProperties_Fragment = { __typename: 'XtdRelAssignsProperties', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelAssignsPropertyWithValues_Fragment = { __typename: 'XtdRelAssignsPropertyWithValues', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelAssignsUnits_Fragment = { __typename: 'XtdRelAssignsUnits', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelAssignsValues_Fragment = { __typename: 'XtdRelAssignsValues', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelAssociates_Fragment = { __typename: 'XtdRelAssociates', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelCollects_Fragment = { __typename: 'XtdRelCollects', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelComposes_Fragment = { __typename: 'XtdRelComposes', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelDocuments_Fragment = { __typename: 'XtdRelDocuments', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelGroups_Fragment = { __typename: 'XtdRelGroups', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelSequences_Fragment = { __typename: 'XtdRelSequences', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdRelSpecializes_Fragment = { __typename: 'XtdRelSpecializes', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdSubject_Fragment = { __typename: 'XtdSubject', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdUnit_Fragment = { __typename: 'XtdUnit', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type SearchResultProps_XtdValue_Fragment = { __typename: 'XtdValue', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

export type SearchResultPropsFragment = SearchResultProps_XtdActivity_Fragment | SearchResultProps_XtdActor_Fragment | SearchResultProps_XtdBag_Fragment | SearchResultProps_XtdClassification_Fragment | SearchResultProps_XtdExternalDocument_Fragment | SearchResultProps_XtdMeasureWithUnit_Fragment | SearchResultProps_XtdNest_Fragment | SearchResultProps_XtdProperty_Fragment | SearchResultProps_XtdRelActsUpon_Fragment | SearchResultProps_XtdRelAssignsCollections_Fragment | SearchResultProps_XtdRelAssignsMeasures_Fragment | SearchResultProps_XtdRelAssignsProperties_Fragment | SearchResultProps_XtdRelAssignsPropertyWithValues_Fragment | SearchResultProps_XtdRelAssignsUnits_Fragment | SearchResultProps_XtdRelAssignsValues_Fragment | SearchResultProps_XtdRelAssociates_Fragment | SearchResultProps_XtdRelCollects_Fragment | SearchResultProps_XtdRelComposes_Fragment | SearchResultProps_XtdRelDocuments_Fragment | SearchResultProps_XtdRelGroups_Fragment | SearchResultProps_XtdRelSequences_Fragment | SearchResultProps_XtdRelSpecializes_Fragment | SearchResultProps_XtdSubject_Fragment | SearchResultProps_XtdUnit_Fragment | SearchResultProps_XtdValue_Fragment;

type ConceptProps_XtdActivity_Fragment = { __typename: 'XtdActivity', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdActor_Fragment = { __typename: 'XtdActor', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdBag_Fragment = { __typename: 'XtdBag', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdClassification_Fragment = { __typename: 'XtdClassification', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdExternalDocument_Fragment = { __typename: 'XtdExternalDocument', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdMeasureWithUnit_Fragment = { __typename: 'XtdMeasureWithUnit', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdNest_Fragment = { __typename: 'XtdNest', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdProperty_Fragment = { __typename: 'XtdProperty', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelActsUpon_Fragment = { __typename: 'XtdRelActsUpon', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelAssignsCollections_Fragment = { __typename: 'XtdRelAssignsCollections', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelAssignsMeasures_Fragment = { __typename: 'XtdRelAssignsMeasures', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelAssignsProperties_Fragment = { __typename: 'XtdRelAssignsProperties', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelAssignsPropertyWithValues_Fragment = { __typename: 'XtdRelAssignsPropertyWithValues', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelAssignsUnits_Fragment = { __typename: 'XtdRelAssignsUnits', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelAssignsValues_Fragment = { __typename: 'XtdRelAssignsValues', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelAssociates_Fragment = { __typename: 'XtdRelAssociates', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelCollects_Fragment = { __typename: 'XtdRelCollects', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelComposes_Fragment = { __typename: 'XtdRelComposes', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelDocuments_Fragment = { __typename: 'XtdRelDocuments', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelGroups_Fragment = { __typename: 'XtdRelGroups', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelSequences_Fragment = { __typename: 'XtdRelSequences', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdRelSpecializes_Fragment = { __typename: 'XtdRelSpecializes', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdSubject_Fragment = { __typename: 'XtdSubject', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdUnit_Fragment = { __typename: 'XtdUnit', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

type ConceptProps_XtdValue_Fragment = { __typename: 'XtdValue', id: string, versionId?: Maybe<string>, versionDate?: Maybe<string>, name?: Maybe<string>, description?: Maybe<string>, de?: Maybe<string>, en?: Maybe<string>, names: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, descriptions: Array<(
    { __typename: 'Translation' }
    & TranslationPropsFragment
  )>, tags: Array<(
    { __typename: 'Tag' }
    & TagPropsFragment
  )> };

export type ConceptPropsFragment = ConceptProps_XtdActivity_Fragment | ConceptProps_XtdActor_Fragment | ConceptProps_XtdBag_Fragment | ConceptProps_XtdClassification_Fragment | ConceptProps_XtdExternalDocument_Fragment | ConceptProps_XtdMeasureWithUnit_Fragment | ConceptProps_XtdNest_Fragment | ConceptProps_XtdProperty_Fragment | ConceptProps_XtdRelActsUpon_Fragment | ConceptProps_XtdRelAssignsCollections_Fragment | ConceptProps_XtdRelAssignsMeasures_Fragment | ConceptProps_XtdRelAssignsProperties_Fragment | ConceptProps_XtdRelAssignsPropertyWithValues_Fragment | ConceptProps_XtdRelAssignsUnits_Fragment | ConceptProps_XtdRelAssignsValues_Fragment | ConceptProps_XtdRelAssociates_Fragment | ConceptProps_XtdRelCollects_Fragment | ConceptProps_XtdRelComposes_Fragment | ConceptProps_XtdRelDocuments_Fragment | ConceptProps_XtdRelGroups_Fragment | ConceptProps_XtdRelSequences_Fragment | ConceptProps_XtdRelSpecializes_Fragment | ConceptProps_XtdSubject_Fragment | ConceptProps_XtdUnit_Fragment | ConceptProps_XtdValue_Fragment;

type EntityProps_XtdActivity_Fragment = { __typename: 'XtdActivity', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdActor_Fragment = { __typename: 'XtdActor', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdBag_Fragment = { __typename: 'XtdBag', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdClassification_Fragment = { __typename: 'XtdClassification', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdExternalDocument_Fragment = { __typename: 'XtdExternalDocument', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdMeasureWithUnit_Fragment = { __typename: 'XtdMeasureWithUnit', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdNest_Fragment = { __typename: 'XtdNest', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdProperty_Fragment = { __typename: 'XtdProperty', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelActsUpon_Fragment = { __typename: 'XtdRelActsUpon', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelAssignsCollections_Fragment = { __typename: 'XtdRelAssignsCollections', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelAssignsMeasures_Fragment = { __typename: 'XtdRelAssignsMeasures', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelAssignsProperties_Fragment = { __typename: 'XtdRelAssignsProperties', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelAssignsPropertyWithValues_Fragment = { __typename: 'XtdRelAssignsPropertyWithValues', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelAssignsUnits_Fragment = { __typename: 'XtdRelAssignsUnits', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelAssignsValues_Fragment = { __typename: 'XtdRelAssignsValues', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelAssociates_Fragment = { __typename: 'XtdRelAssociates', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelCollects_Fragment = { __typename: 'XtdRelCollects', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelComposes_Fragment = { __typename: 'XtdRelComposes', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelDocuments_Fragment = { __typename: 'XtdRelDocuments', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelGroups_Fragment = { __typename: 'XtdRelGroups', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelSequences_Fragment = { __typename: 'XtdRelSequences', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdRelSpecializes_Fragment = { __typename: 'XtdRelSpecializes', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdSubject_Fragment = { __typename: 'XtdSubject', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdUnit_Fragment = { __typename: 'XtdUnit', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

type EntityProps_XtdValue_Fragment = { __typename: 'XtdValue', created: string, createdBy: string, lastModified: string, lastModifiedBy: string };

export type EntityPropsFragment = EntityProps_XtdActivity_Fragment | EntityProps_XtdActor_Fragment | EntityProps_XtdBag_Fragment | EntityProps_XtdClassification_Fragment | EntityProps_XtdExternalDocument_Fragment | EntityProps_XtdMeasureWithUnit_Fragment | EntityProps_XtdNest_Fragment | EntityProps_XtdProperty_Fragment | EntityProps_XtdRelActsUpon_Fragment | EntityProps_XtdRelAssignsCollections_Fragment | EntityProps_XtdRelAssignsMeasures_Fragment | EntityProps_XtdRelAssignsProperties_Fragment | EntityProps_XtdRelAssignsPropertyWithValues_Fragment | EntityProps_XtdRelAssignsUnits_Fragment | EntityProps_XtdRelAssignsValues_Fragment | EntityProps_XtdRelAssociates_Fragment | EntityProps_XtdRelCollects_Fragment | EntityProps_XtdRelComposes_Fragment | EntityProps_XtdRelDocuments_Fragment | EntityProps_XtdRelGroups_Fragment | EntityProps_XtdRelSequences_Fragment | EntityProps_XtdRelSpecializes_Fragment | EntityProps_XtdSubject_Fragment | EntityProps_XtdUnit_Fragment | EntityProps_XtdValue_Fragment;

export type ExternalDocumentPropsFragment = (
  { __typename: 'XtdExternalDocument' }
  & ConceptProps_XtdExternalDocument_Fragment
  & EntityProps_XtdExternalDocument_Fragment
);

type ObjectProps_XtdActivity_Fragment = (
  { __typename: 'XtdActivity' }
  & ConceptProps_XtdActivity_Fragment
  & EntityProps_XtdActivity_Fragment
);

type ObjectProps_XtdActor_Fragment = (
  { __typename: 'XtdActor' }
  & ConceptProps_XtdActor_Fragment
  & EntityProps_XtdActor_Fragment
);

type ObjectProps_XtdClassification_Fragment = (
  { __typename: 'XtdClassification' }
  & ConceptProps_XtdClassification_Fragment
  & EntityProps_XtdClassification_Fragment
);

type ObjectProps_XtdMeasureWithUnit_Fragment = (
  { __typename: 'XtdMeasureWithUnit' }
  & ConceptProps_XtdMeasureWithUnit_Fragment
  & EntityProps_XtdMeasureWithUnit_Fragment
);

type ObjectProps_XtdProperty_Fragment = (
  { __typename: 'XtdProperty' }
  & ConceptProps_XtdProperty_Fragment
  & EntityProps_XtdProperty_Fragment
);

type ObjectProps_XtdSubject_Fragment = (
  { __typename: 'XtdSubject' }
  & ConceptProps_XtdSubject_Fragment
  & EntityProps_XtdSubject_Fragment
);

type ObjectProps_XtdUnit_Fragment = (
  { __typename: 'XtdUnit' }
  & ConceptProps_XtdUnit_Fragment
  & EntityProps_XtdUnit_Fragment
);

type ObjectProps_XtdValue_Fragment = (
  { __typename: 'XtdValue' }
  & ConceptProps_XtdValue_Fragment
  & EntityProps_XtdValue_Fragment
);

export type ObjectPropsFragment = ObjectProps_XtdActivity_Fragment | ObjectProps_XtdActor_Fragment | ObjectProps_XtdClassification_Fragment | ObjectProps_XtdMeasureWithUnit_Fragment | ObjectProps_XtdProperty_Fragment | ObjectProps_XtdSubject_Fragment | ObjectProps_XtdUnit_Fragment | ObjectProps_XtdValue_Fragment;

type CollectionProps_XtdBag_Fragment = (
  { __typename: 'XtdBag' }
  & ConceptProps_XtdBag_Fragment
  & EntityProps_XtdBag_Fragment
);

type CollectionProps_XtdNest_Fragment = (
  { __typename: 'XtdNest' }
  & ConceptProps_XtdNest_Fragment
  & EntityProps_XtdNest_Fragment
);

export type CollectionPropsFragment = CollectionProps_XtdBag_Fragment | CollectionProps_XtdNest_Fragment;

type RelationshipProps_XtdRelActsUpon_Fragment = (
  { __typename: 'XtdRelActsUpon' }
  & ConceptProps_XtdRelActsUpon_Fragment
  & EntityProps_XtdRelActsUpon_Fragment
);

type RelationshipProps_XtdRelAssignsCollections_Fragment = (
  { __typename: 'XtdRelAssignsCollections' }
  & ConceptProps_XtdRelAssignsCollections_Fragment
  & EntityProps_XtdRelAssignsCollections_Fragment
);

type RelationshipProps_XtdRelAssignsMeasures_Fragment = (
  { __typename: 'XtdRelAssignsMeasures' }
  & ConceptProps_XtdRelAssignsMeasures_Fragment
  & EntityProps_XtdRelAssignsMeasures_Fragment
);

type RelationshipProps_XtdRelAssignsProperties_Fragment = (
  { __typename: 'XtdRelAssignsProperties' }
  & ConceptProps_XtdRelAssignsProperties_Fragment
  & EntityProps_XtdRelAssignsProperties_Fragment
);

type RelationshipProps_XtdRelAssignsPropertyWithValues_Fragment = (
  { __typename: 'XtdRelAssignsPropertyWithValues' }
  & ConceptProps_XtdRelAssignsPropertyWithValues_Fragment
  & EntityProps_XtdRelAssignsPropertyWithValues_Fragment
);

type RelationshipProps_XtdRelAssignsUnits_Fragment = (
  { __typename: 'XtdRelAssignsUnits' }
  & ConceptProps_XtdRelAssignsUnits_Fragment
  & EntityProps_XtdRelAssignsUnits_Fragment
);

type RelationshipProps_XtdRelAssignsValues_Fragment = (
  { __typename: 'XtdRelAssignsValues' }
  & ConceptProps_XtdRelAssignsValues_Fragment
  & EntityProps_XtdRelAssignsValues_Fragment
);

type RelationshipProps_XtdRelAssociates_Fragment = (
  { __typename: 'XtdRelAssociates' }
  & ConceptProps_XtdRelAssociates_Fragment
  & EntityProps_XtdRelAssociates_Fragment
);

type RelationshipProps_XtdRelCollects_Fragment = (
  { __typename: 'XtdRelCollects' }
  & ConceptProps_XtdRelCollects_Fragment
  & EntityProps_XtdRelCollects_Fragment
);

type RelationshipProps_XtdRelComposes_Fragment = (
  { __typename: 'XtdRelComposes' }
  & ConceptProps_XtdRelComposes_Fragment
  & EntityProps_XtdRelComposes_Fragment
);

type RelationshipProps_XtdRelDocuments_Fragment = (
  { __typename: 'XtdRelDocuments' }
  & ConceptProps_XtdRelDocuments_Fragment
  & EntityProps_XtdRelDocuments_Fragment
);

type RelationshipProps_XtdRelGroups_Fragment = (
  { __typename: 'XtdRelGroups' }
  & ConceptProps_XtdRelGroups_Fragment
  & EntityProps_XtdRelGroups_Fragment
);

type RelationshipProps_XtdRelSequences_Fragment = (
  { __typename: 'XtdRelSequences' }
  & ConceptProps_XtdRelSequences_Fragment
  & EntityProps_XtdRelSequences_Fragment
);

type RelationshipProps_XtdRelSpecializes_Fragment = (
  { __typename: 'XtdRelSpecializes' }
  & ConceptProps_XtdRelSpecializes_Fragment
  & EntityProps_XtdRelSpecializes_Fragment
);

export type RelationshipPropsFragment = RelationshipProps_XtdRelActsUpon_Fragment | RelationshipProps_XtdRelAssignsCollections_Fragment | RelationshipProps_XtdRelAssignsMeasures_Fragment | RelationshipProps_XtdRelAssignsProperties_Fragment | RelationshipProps_XtdRelAssignsPropertyWithValues_Fragment | RelationshipProps_XtdRelAssignsUnits_Fragment | RelationshipProps_XtdRelAssignsValues_Fragment | RelationshipProps_XtdRelAssociates_Fragment | RelationshipProps_XtdRelCollects_Fragment | RelationshipProps_XtdRelComposes_Fragment | RelationshipProps_XtdRelDocuments_Fragment | RelationshipProps_XtdRelGroups_Fragment | RelationshipProps_XtdRelSequences_Fragment | RelationshipProps_XtdRelSpecializes_Fragment;

export type DocumentsPropsFragment = (
  { __typename: 'XtdRelDocuments', relatedThings: Array<(
    { __typename: 'XtdActivity' }
    & SearchResultProps_XtdActivity_Fragment
  ) | (
    { __typename: 'XtdActor' }
    & SearchResultProps_XtdActor_Fragment
  ) | (
    { __typename: 'XtdBag' }
    & SearchResultProps_XtdBag_Fragment
  ) | (
    { __typename: 'XtdClassification' }
    & SearchResultProps_XtdClassification_Fragment
  ) | (
    { __typename: 'XtdMeasureWithUnit' }
    & SearchResultProps_XtdMeasureWithUnit_Fragment
  ) | (
    { __typename: 'XtdNest' }
    & SearchResultProps_XtdNest_Fragment
  ) | (
    { __typename: 'XtdProperty' }
    & SearchResultProps_XtdProperty_Fragment
  ) | (
    { __typename: 'XtdSubject' }
    & SearchResultProps_XtdSubject_Fragment
  ) | (
    { __typename: 'XtdUnit' }
    & SearchResultProps_XtdUnit_Fragment
  ) | (
    { __typename: 'XtdValue' }
    & SearchResultProps_XtdValue_Fragment
  )> }
  & RelationshipProps_XtdRelDocuments_Fragment
);

export type CollectsPropsFragment = (
  { __typename: 'XtdRelCollects', relatingCollection: (
    { __typename: 'XtdBag', tags: Array<(
      { __typename: 'Tag' }
      & TagPropsFragment
    )> }
    & SearchResultProps_XtdBag_Fragment
  ) | (
    { __typename: 'XtdNest', tags: Array<(
      { __typename: 'Tag' }
      & TagPropsFragment
    )> }
    & SearchResultProps_XtdNest_Fragment
  ), relatedThings: Array<(
    { __typename: 'XtdActivity' }
    & SearchResultProps_XtdActivity_Fragment
  ) | (
    { __typename: 'XtdActor' }
    & SearchResultProps_XtdActor_Fragment
  ) | (
    { __typename: 'XtdBag' }
    & SearchResultProps_XtdBag_Fragment
  ) | (
    { __typename: 'XtdClassification' }
    & SearchResultProps_XtdClassification_Fragment
  ) | (
    { __typename: 'XtdMeasureWithUnit' }
    & SearchResultProps_XtdMeasureWithUnit_Fragment
  ) | (
    { __typename: 'XtdNest' }
    & SearchResultProps_XtdNest_Fragment
  ) | (
    { __typename: 'XtdProperty' }
    & SearchResultProps_XtdProperty_Fragment
  ) | (
    { __typename: 'XtdSubject' }
    & SearchResultProps_XtdSubject_Fragment
  ) | (
    { __typename: 'XtdUnit' }
    & SearchResultProps_XtdUnit_Fragment
  ) | (
    { __typename: 'XtdValue' }
    & SearchResultProps_XtdValue_Fragment
  )> }
  & RelationshipProps_XtdRelCollects_Fragment
);

export type AssignsCollectionsPropsFragment = (
  { __typename: 'XtdRelAssignsCollections', relatingObject: (
    { __typename: 'XtdActivity' }
    & SearchResultProps_XtdActivity_Fragment
  ) | (
    { __typename: 'XtdActor' }
    & SearchResultProps_XtdActor_Fragment
  ) | (
    { __typename: 'XtdClassification' }
    & SearchResultProps_XtdClassification_Fragment
  ) | (
    { __typename: 'XtdMeasureWithUnit' }
    & SearchResultProps_XtdMeasureWithUnit_Fragment
  ) | (
    { __typename: 'XtdProperty' }
    & SearchResultProps_XtdProperty_Fragment
  ) | (
    { __typename: 'XtdSubject' }
    & SearchResultProps_XtdSubject_Fragment
  ) | (
    { __typename: 'XtdUnit' }
    & SearchResultProps_XtdUnit_Fragment
  ) | (
    { __typename: 'XtdValue' }
    & SearchResultProps_XtdValue_Fragment
  ), relatedCollections: Array<(
    { __typename: 'XtdBag' }
    & SearchResultProps_XtdBag_Fragment
  ) | (
    { __typename: 'XtdNest' }
    & SearchResultProps_XtdNest_Fragment
  )> }
  & RelationshipProps_XtdRelAssignsCollections_Fragment
);

export type AssignsPropertiesPropsFragment = (
  { __typename: 'XtdRelAssignsProperties', relatingObject: (
    { __typename: 'XtdActivity' }
    & SearchResultProps_XtdActivity_Fragment
  ) | (
    { __typename: 'XtdActor' }
    & SearchResultProps_XtdActor_Fragment
  ) | (
    { __typename: 'XtdClassification' }
    & SearchResultProps_XtdClassification_Fragment
  ) | (
    { __typename: 'XtdMeasureWithUnit' }
    & SearchResultProps_XtdMeasureWithUnit_Fragment
  ) | (
    { __typename: 'XtdProperty' }
    & SearchResultProps_XtdProperty_Fragment
  ) | (
    { __typename: 'XtdSubject' }
    & SearchResultProps_XtdSubject_Fragment
  ) | (
    { __typename: 'XtdUnit' }
    & SearchResultProps_XtdUnit_Fragment
  ) | (
    { __typename: 'XtdValue' }
    & SearchResultProps_XtdValue_Fragment
  ), relatedProperties: Array<(
    { __typename: 'XtdProperty' }
    & SearchResultProps_XtdProperty_Fragment
  )> }
  & RelationshipProps_XtdRelAssignsProperties_Fragment
);

export type AssignsPropertyWithValuesPropsFragment = (
  { __typename: 'XtdRelAssignsPropertyWithValues', relatedProperty: (
    { __typename: 'XtdProperty' }
    & SearchResultProps_XtdProperty_Fragment
  ), relatedValues: Array<(
    { __typename: 'XtdValue' }
    & SearchResultProps_XtdValue_Fragment
  )> }
  & RelationshipProps_XtdRelAssignsPropertyWithValues_Fragment
);

export type ExternalDocumentDetailPropsFragment = (
  { __typename: 'XtdExternalDocument', documents: { __typename: 'XtdRelDocumentsConnection', nodes: Array<(
      { __typename: 'XtdRelDocuments' }
      & DocumentsPropsFragment
    )> } }
  & ExternalDocumentPropsFragment
);

type ObjectDetailProps_XtdActivity_Fragment = (
  { __typename: 'XtdActivity', assignedCollections: { __typename: 'XtdRelAssignsCollectionsConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsCollections' }
      & AssignsCollectionsPropsFragment
    )> }, assignedProperties: { __typename: 'XtdRelAssignsPropertiesConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsProperties' }
      & AssignsPropertiesPropsFragment
    )> } }
  & ObjectProps_XtdActivity_Fragment
);

type ObjectDetailProps_XtdActor_Fragment = (
  { __typename: 'XtdActor', assignedCollections: { __typename: 'XtdRelAssignsCollectionsConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsCollections' }
      & AssignsCollectionsPropsFragment
    )> }, assignedProperties: { __typename: 'XtdRelAssignsPropertiesConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsProperties' }
      & AssignsPropertiesPropsFragment
    )> } }
  & ObjectProps_XtdActor_Fragment
);

type ObjectDetailProps_XtdClassification_Fragment = (
  { __typename: 'XtdClassification', assignedCollections: { __typename: 'XtdRelAssignsCollectionsConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsCollections' }
      & AssignsCollectionsPropsFragment
    )> }, assignedProperties: { __typename: 'XtdRelAssignsPropertiesConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsProperties' }
      & AssignsPropertiesPropsFragment
    )> } }
  & ObjectProps_XtdClassification_Fragment
);

type ObjectDetailProps_XtdMeasureWithUnit_Fragment = (
  { __typename: 'XtdMeasureWithUnit', assignedCollections: { __typename: 'XtdRelAssignsCollectionsConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsCollections' }
      & AssignsCollectionsPropsFragment
    )> }, assignedProperties: { __typename: 'XtdRelAssignsPropertiesConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsProperties' }
      & AssignsPropertiesPropsFragment
    )> } }
  & ObjectProps_XtdMeasureWithUnit_Fragment
);

type ObjectDetailProps_XtdProperty_Fragment = (
  { __typename: 'XtdProperty', assignedCollections: { __typename: 'XtdRelAssignsCollectionsConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsCollections' }
      & AssignsCollectionsPropsFragment
    )> }, assignedProperties: { __typename: 'XtdRelAssignsPropertiesConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsProperties' }
      & AssignsPropertiesPropsFragment
    )> } }
  & ObjectProps_XtdProperty_Fragment
);

type ObjectDetailProps_XtdSubject_Fragment = (
  { __typename: 'XtdSubject', assignedCollections: { __typename: 'XtdRelAssignsCollectionsConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsCollections' }
      & AssignsCollectionsPropsFragment
    )> }, assignedProperties: { __typename: 'XtdRelAssignsPropertiesConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsProperties' }
      & AssignsPropertiesPropsFragment
    )> } }
  & ObjectProps_XtdSubject_Fragment
);

type ObjectDetailProps_XtdUnit_Fragment = (
  { __typename: 'XtdUnit', assignedCollections: { __typename: 'XtdRelAssignsCollectionsConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsCollections' }
      & AssignsCollectionsPropsFragment
    )> }, assignedProperties: { __typename: 'XtdRelAssignsPropertiesConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsProperties' }
      & AssignsPropertiesPropsFragment
    )> } }
  & ObjectProps_XtdUnit_Fragment
);

type ObjectDetailProps_XtdValue_Fragment = (
  { __typename: 'XtdValue', assignedCollections: { __typename: 'XtdRelAssignsCollectionsConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsCollections' }
      & AssignsCollectionsPropsFragment
    )> }, assignedProperties: { __typename: 'XtdRelAssignsPropertiesConnection', nodes: Array<(
      { __typename: 'XtdRelAssignsProperties' }
      & AssignsPropertiesPropsFragment
    )> } }
  & ObjectProps_XtdValue_Fragment
);

export type ObjectDetailPropsFragment = ObjectDetailProps_XtdActivity_Fragment | ObjectDetailProps_XtdActor_Fragment | ObjectDetailProps_XtdClassification_Fragment | ObjectDetailProps_XtdMeasureWithUnit_Fragment | ObjectDetailProps_XtdProperty_Fragment | ObjectDetailProps_XtdSubject_Fragment | ObjectDetailProps_XtdUnit_Fragment | ObjectDetailProps_XtdValue_Fragment;

type CollectionDetailProps_XtdBag_Fragment = (
  { __typename: 'XtdBag', collects: { __typename: 'XtdRelCollectsConnection', nodes: Array<(
      { __typename: 'XtdRelCollects' }
      & CollectsPropsFragment
    )> }, collectedBy: { __typename: 'XtdRelCollectsConnection', nodes: Array<(
      { __typename: 'XtdRelCollects' }
      & CollectsPropsFragment
    )> } }
  & CollectionProps_XtdBag_Fragment
);

type CollectionDetailProps_XtdNest_Fragment = (
  { __typename: 'XtdNest', collects: { __typename: 'XtdRelCollectsConnection', nodes: Array<(
      { __typename: 'XtdRelCollects' }
      & CollectsPropsFragment
    )> }, collectedBy: { __typename: 'XtdRelCollectsConnection', nodes: Array<(
      { __typename: 'XtdRelCollects' }
      & CollectsPropsFragment
    )> } }
  & CollectionProps_XtdNest_Fragment
);

export type CollectionDetailPropsFragment = CollectionDetailProps_XtdBag_Fragment | CollectionDetailProps_XtdNest_Fragment;

export type UpdateProfileMutationVariables = Exact<{
  input: ProfileUpdateInput;
}>;


export type UpdateProfileMutation = { __typename: 'Mutation', updateProfile: (
    { __typename: 'Profile' }
    & UserProfileFragment
  ) };

export type CreateEntryMutationVariables = Exact<{
  input: CreateEntryInput;
}>;


export type CreateEntryMutation = { __typename: 'Mutation', createEntry?: Maybe<{ __typename: 'CreateEntryPayload', entry?: Maybe<(
      { __typename: 'XtdActor' }
      & ConceptProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdActivity' }
      & ConceptProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & ConceptProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & ConceptProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & ConceptProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & ConceptProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & ConceptProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & ConceptProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & ConceptProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & ConceptProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & ConceptProps_XtdValue_Fragment
    )> }> };

export type DeleteEntryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteEntryMutation = { __typename: 'Mutation', deleteEntry?: Maybe<{ __typename: 'DeleteEntryPayload', entry?: Maybe<(
      { __typename: 'XtdActor' }
      & ConceptProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdActivity' }
      & ConceptProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & ConceptProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & ConceptProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & ConceptProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & ConceptProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & ConceptProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & ConceptProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & ConceptProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & ConceptProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & ConceptProps_XtdValue_Fragment
    )> }> };

export type SetVersionMutationVariables = Exact<{
  input: SetVersionInput;
}>;


export type SetVersionMutation = { __typename: 'Mutation', setVersion?: Maybe<{ __typename: 'SetVersionPayload', entry?: Maybe<(
      { __typename: 'XtdActor' }
      & ConceptProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdActivity' }
      & ConceptProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & ConceptProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & ConceptProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & ConceptProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & ConceptProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & ConceptProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & ConceptProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & ConceptProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & ConceptProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & ConceptProps_XtdValue_Fragment
    )> }> };

export type AddNameMutationVariables = Exact<{
  input: AddNameInput;
}>;


export type AddNameMutation = { __typename: 'Mutation', addName?: Maybe<{ __typename: 'AddNamePayload', entry?: Maybe<(
      { __typename: 'XtdActor' }
      & ConceptProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdActivity' }
      & ConceptProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & ConceptProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & ConceptProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & ConceptProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & ConceptProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & ConceptProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & ConceptProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & ConceptProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & ConceptProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & ConceptProps_XtdValue_Fragment
    )> }> };

export type UpdateNameMutationVariables = Exact<{
  input: UpdateNameInput;
}>;


export type UpdateNameMutation = { __typename: 'Mutation', updateName?: Maybe<{ __typename: 'UpdateNamePayload', entry?: Maybe<(
      { __typename: 'XtdActor' }
      & ConceptProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdActivity' }
      & ConceptProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & ConceptProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & ConceptProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & ConceptProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & ConceptProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & ConceptProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & ConceptProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & ConceptProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & ConceptProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & ConceptProps_XtdValue_Fragment
    )> }> };

export type DeleteNameMutationVariables = Exact<{
  input: DeleteNameInput;
}>;


export type DeleteNameMutation = { __typename: 'Mutation', deleteName?: Maybe<{ __typename: 'DeleteNamePayload', entry?: Maybe<(
      { __typename: 'XtdActor' }
      & ConceptProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdActivity' }
      & ConceptProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & ConceptProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & ConceptProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & ConceptProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & ConceptProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & ConceptProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & ConceptProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & ConceptProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & ConceptProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & ConceptProps_XtdValue_Fragment
    )> }> };

export type AddDescriptionMutationVariables = Exact<{
  input: AddDescriptionInput;
}>;


export type AddDescriptionMutation = { __typename: 'Mutation', addDescription?: Maybe<{ __typename: 'AddDescriptionPayload', entry?: Maybe<(
      { __typename: 'XtdActor' }
      & ConceptProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdActivity' }
      & ConceptProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & ConceptProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & ConceptProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & ConceptProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & ConceptProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & ConceptProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & ConceptProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & ConceptProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & ConceptProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & ConceptProps_XtdValue_Fragment
    )> }> };

export type UpdateDescriptionMutationVariables = Exact<{
  input: UpdateDescriptionInput;
}>;


export type UpdateDescriptionMutation = { __typename: 'Mutation', updateDescription?: Maybe<{ __typename: 'UpdateDescriptionPayload', entry?: Maybe<(
      { __typename: 'XtdActor' }
      & ConceptProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdActivity' }
      & ConceptProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & ConceptProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & ConceptProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & ConceptProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & ConceptProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & ConceptProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & ConceptProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & ConceptProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & ConceptProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & ConceptProps_XtdValue_Fragment
    )> }> };

export type DeleteDescriptionMutationVariables = Exact<{
  input: DeleteDescriptionInput;
}>;


export type DeleteDescriptionMutation = { __typename: 'Mutation', deleteDescription?: Maybe<{ __typename: 'DeleteDescriptionPayload', entry?: Maybe<(
      { __typename: 'XtdActor' }
      & ConceptProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdActivity' }
      & ConceptProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & ConceptProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & ConceptProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & ConceptProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & ConceptProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & ConceptProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & ConceptProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & ConceptProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & ConceptProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & ConceptProps_XtdValue_Fragment
    )> }> };

export type CreateOneToManyRelationshipMutationVariables = Exact<{
  input: CreateOneToManyRelationshipInput;
}>;


export type CreateOneToManyRelationshipMutation = { __typename: 'Mutation', createOneToManyRelationship?: Maybe<{ __typename: 'CreateOneToManyRelationshipPayload', relationship?: Maybe<{ __typename: 'XtdRelActsUpon', id: string } | { __typename: 'XtdRelAssignsCollections', id: string } | { __typename: 'XtdRelAssignsMeasures', id: string } | { __typename: 'XtdRelAssignsProperties', id: string } | { __typename: 'XtdRelAssignsUnits', id: string } | { __typename: 'XtdRelAssignsValues', id: string } | { __typename: 'XtdRelAssociates', id: string } | { __typename: 'XtdRelCollects', id: string } | { __typename: 'XtdRelComposes', id: string } | { __typename: 'XtdRelDocuments', id: string } | { __typename: 'XtdRelGroups', id: string } | { __typename: 'XtdRelSpecializes', id: string }> }> };

export type UpdateOneToManyRelationshipMutationVariables = Exact<{
  oldId: Scalars['ID'];
  input: CreateOneToManyRelationshipInput;
}>;


export type UpdateOneToManyRelationshipMutation = { __typename: 'Mutation', deleteRelationship?: Maybe<{ __typename: 'DeleteRelationshipPayload', relationship?: Maybe<{ __typename: 'XtdRelActsUpon', id: string } | { __typename: 'XtdRelAssignsCollections', id: string } | { __typename: 'XtdRelAssignsMeasures', id: string } | { __typename: 'XtdRelAssignsProperties', id: string } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string } | { __typename: 'XtdRelAssignsUnits', id: string } | { __typename: 'XtdRelAssignsValues', id: string } | { __typename: 'XtdRelAssociates', id: string } | { __typename: 'XtdRelCollects', id: string } | { __typename: 'XtdRelComposes', id: string } | { __typename: 'XtdRelDocuments', id: string } | { __typename: 'XtdRelGroups', id: string } | { __typename: 'XtdRelSequences', id: string } | { __typename: 'XtdRelSpecializes', id: string }> }>, createOneToManyRelationship?: Maybe<{ __typename: 'CreateOneToManyRelationshipPayload', relationship?: Maybe<{ __typename: 'XtdRelActsUpon', id: string } | { __typename: 'XtdRelAssignsCollections', id: string } | { __typename: 'XtdRelAssignsMeasures', id: string } | { __typename: 'XtdRelAssignsProperties', id: string } | { __typename: 'XtdRelAssignsUnits', id: string } | { __typename: 'XtdRelAssignsValues', id: string } | { __typename: 'XtdRelAssociates', id: string } | { __typename: 'XtdRelCollects', id: string } | { __typename: 'XtdRelComposes', id: string } | { __typename: 'XtdRelDocuments', id: string } | { __typename: 'XtdRelGroups', id: string } | { __typename: 'XtdRelSpecializes', id: string }> }> };

export type DeleteRelationshipMutationVariables = Exact<{
  input: DeleteRelationshipInput;
}>;


export type DeleteRelationshipMutation = { __typename: 'Mutation', deleteRelationship?: Maybe<{ __typename: 'DeleteRelationshipPayload', relationship?: Maybe<{ __typename: 'XtdRelActsUpon', id: string } | { __typename: 'XtdRelAssignsCollections', id: string } | { __typename: 'XtdRelAssignsMeasures', id: string } | { __typename: 'XtdRelAssignsProperties', id: string } | { __typename: 'XtdRelAssignsPropertyWithValues', id: string } | { __typename: 'XtdRelAssignsUnits', id: string } | { __typename: 'XtdRelAssignsValues', id: string } | { __typename: 'XtdRelAssociates', id: string } | { __typename: 'XtdRelCollects', id: string } | { __typename: 'XtdRelComposes', id: string } | { __typename: 'XtdRelDocuments', id: string } | { __typename: 'XtdRelGroups', id: string } | { __typename: 'XtdRelSequences', id: string } | { __typename: 'XtdRelSpecializes', id: string }> }> };

export type TagBagMutationVariables = Exact<{
  bagId: Scalars['ID'];
  tagId: Scalars['ID'];
}>;


export type TagBagMutation = { __typename: 'Mutation', tag: { __typename: 'XtdActivity' } | { __typename: 'XtdActor' } | (
    { __typename: 'XtdBag' }
    & CollectionDetailProps_XtdBag_Fragment
  ) | { __typename: 'XtdClassification' } | { __typename: 'XtdExternalDocument' } | { __typename: 'XtdMeasureWithUnit' } | (
    { __typename: 'XtdNest' }
    & CollectionDetailProps_XtdNest_Fragment
  ) | { __typename: 'XtdProperty' } | { __typename: 'XtdRelActsUpon' } | { __typename: 'XtdRelAssignsCollections' } | { __typename: 'XtdRelAssignsMeasures' } | { __typename: 'XtdRelAssignsProperties' } | { __typename: 'XtdRelAssignsPropertyWithValues' } | { __typename: 'XtdRelAssignsUnits' } | { __typename: 'XtdRelAssignsValues' } | { __typename: 'XtdRelAssociates' } | { __typename: 'XtdRelCollects' } | { __typename: 'XtdRelComposes' } | { __typename: 'XtdRelDocuments' } | { __typename: 'XtdRelGroups' } | { __typename: 'XtdRelSequences' } | { __typename: 'XtdRelSpecializes' } | { __typename: 'XtdSubject' } | { __typename: 'XtdUnit' } | { __typename: 'XtdValue' } };

export type FindLanguagesQueryVariables = Exact<{
  input: LanguageFilterInput;
}>;


export type FindLanguagesQuery = { __typename: 'Query', languages?: Maybe<{ __typename: 'LanguageConnection', totalElements: number, nodes: Array<(
      { __typename: 'Language' }
      & LanguagePropsFragment
    )> }> };

export type FindConceptQueryVariables = Exact<{
  input: SearchInput;
}>;


export type FindConceptQuery = { __typename: 'Query', search: { __typename: 'SearchResultConnection', totalElements: number, nodes: Array<(
      { __typename: 'XtdActivity' }
      & SearchResultProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdActor' }
      & SearchResultProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & SearchResultProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & SearchResultProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & SearchResultProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & SearchResultProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & SearchResultProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & SearchResultProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdRelActsUpon' }
      & SearchResultProps_XtdRelActsUpon_Fragment
    ) | (
      { __typename: 'XtdRelAssignsCollections' }
      & SearchResultProps_XtdRelAssignsCollections_Fragment
    ) | (
      { __typename: 'XtdRelAssignsMeasures' }
      & SearchResultProps_XtdRelAssignsMeasures_Fragment
    ) | (
      { __typename: 'XtdRelAssignsProperties' }
      & SearchResultProps_XtdRelAssignsProperties_Fragment
    ) | (
      { __typename: 'XtdRelAssignsPropertyWithValues' }
      & SearchResultProps_XtdRelAssignsPropertyWithValues_Fragment
    ) | (
      { __typename: 'XtdRelAssignsUnits' }
      & SearchResultProps_XtdRelAssignsUnits_Fragment
    ) | (
      { __typename: 'XtdRelAssignsValues' }
      & SearchResultProps_XtdRelAssignsValues_Fragment
    ) | (
      { __typename: 'XtdRelAssociates' }
      & SearchResultProps_XtdRelAssociates_Fragment
    ) | (
      { __typename: 'XtdRelCollects' }
      & SearchResultProps_XtdRelCollects_Fragment
    ) | (
      { __typename: 'XtdRelComposes' }
      & SearchResultProps_XtdRelComposes_Fragment
    ) | (
      { __typename: 'XtdRelDocuments' }
      & SearchResultProps_XtdRelDocuments_Fragment
    ) | (
      { __typename: 'XtdRelGroups' }
      & SearchResultProps_XtdRelGroups_Fragment
    ) | (
      { __typename: 'XtdRelSequences' }
      & SearchResultProps_XtdRelSequences_Fragment
    ) | (
      { __typename: 'XtdRelSpecializes' }
      & SearchResultProps_XtdRelSpecializes_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & SearchResultProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & SearchResultProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & SearchResultProps_XtdValue_Fragment
    )> } };

export type PropertyTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type PropertyTreeQuery = { __typename: 'Query', hierarchy: { __typename: 'HierarchyPayload', paths: Array<Array<string>>, nodes: Array<(
      { __typename: 'XtdActivity' }
      & ConceptProps_XtdActivity_Fragment
    ) | (
      { __typename: 'XtdActor' }
      & ConceptProps_XtdActor_Fragment
    ) | (
      { __typename: 'XtdBag' }
      & ConceptProps_XtdBag_Fragment
    ) | (
      { __typename: 'XtdClassification' }
      & ConceptProps_XtdClassification_Fragment
    ) | (
      { __typename: 'XtdExternalDocument' }
      & ConceptProps_XtdExternalDocument_Fragment
    ) | (
      { __typename: 'XtdMeasureWithUnit' }
      & ConceptProps_XtdMeasureWithUnit_Fragment
    ) | (
      { __typename: 'XtdNest' }
      & ConceptProps_XtdNest_Fragment
    ) | (
      { __typename: 'XtdProperty' }
      & ConceptProps_XtdProperty_Fragment
    ) | (
      { __typename: 'XtdRelActsUpon' }
      & ConceptProps_XtdRelActsUpon_Fragment
    ) | (
      { __typename: 'XtdRelAssignsCollections' }
      & ConceptProps_XtdRelAssignsCollections_Fragment
    ) | (
      { __typename: 'XtdRelAssignsMeasures' }
      & ConceptProps_XtdRelAssignsMeasures_Fragment
    ) | (
      { __typename: 'XtdRelAssignsProperties' }
      & ConceptProps_XtdRelAssignsProperties_Fragment
    ) | (
      { __typename: 'XtdRelAssignsPropertyWithValues' }
      & ConceptProps_XtdRelAssignsPropertyWithValues_Fragment
    ) | (
      { __typename: 'XtdRelAssignsUnits' }
      & ConceptProps_XtdRelAssignsUnits_Fragment
    ) | (
      { __typename: 'XtdRelAssignsValues' }
      & ConceptProps_XtdRelAssignsValues_Fragment
    ) | (
      { __typename: 'XtdRelAssociates' }
      & ConceptProps_XtdRelAssociates_Fragment
    ) | (
      { __typename: 'XtdRelCollects' }
      & ConceptProps_XtdRelCollects_Fragment
    ) | (
      { __typename: 'XtdRelComposes' }
      & ConceptProps_XtdRelComposes_Fragment
    ) | (
      { __typename: 'XtdRelDocuments' }
      & ConceptProps_XtdRelDocuments_Fragment
    ) | (
      { __typename: 'XtdRelGroups' }
      & ConceptProps_XtdRelGroups_Fragment
    ) | (
      { __typename: 'XtdRelSequences' }
      & ConceptProps_XtdRelSequences_Fragment
    ) | (
      { __typename: 'XtdRelSpecializes' }
      & ConceptProps_XtdRelSpecializes_Fragment
    ) | (
      { __typename: 'XtdSubject' }
      & ConceptProps_XtdSubject_Fragment
    ) | (
      { __typename: 'XtdUnit' }
      & ConceptProps_XtdUnit_Fragment
    ) | (
      { __typename: 'XtdValue' }
      & ConceptProps_XtdValue_Fragment
    )> } };

export type ExternalDocumentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ExternalDocumentQuery = { __typename: 'Query', externalDocument?: Maybe<(
    { __typename: 'XtdExternalDocument' }
    & ExternalDocumentDetailPropsFragment
  )> };

export type SubjectsQueryVariables = Exact<{
  input?: Maybe<FilterInput>;
}>;


export type SubjectsQuery = { __typename: 'Query', subjects: { __typename: 'XtdSubjectConnection', totalElements: number, nodes: Array<(
      { __typename: 'XtdSubject' }
      & ObjectProps_XtdSubject_Fragment
    )>, pageInfo: (
      { __typename: 'PageInfo' }
      & PagePropsFragment
    ) } };

export type GetObjectEntryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetObjectEntryQuery = { __typename: 'Query', node?: Maybe<(
    { __typename: 'XtdActivity' }
    & ObjectDetailProps_XtdActivity_Fragment
  ) | (
    { __typename: 'XtdActor' }
    & ObjectDetailProps_XtdActor_Fragment
  ) | { __typename: 'XtdBag' } | (
    { __typename: 'XtdClassification' }
    & ObjectDetailProps_XtdClassification_Fragment
  ) | { __typename: 'XtdExternalDocument' } | (
    { __typename: 'XtdMeasureWithUnit' }
    & ObjectDetailProps_XtdMeasureWithUnit_Fragment
  ) | { __typename: 'XtdNest' } | (
    { __typename: 'XtdProperty' }
    & ObjectDetailProps_XtdProperty_Fragment
  ) | { __typename: 'XtdRelActsUpon' } | { __typename: 'XtdRelAssignsCollections' } | { __typename: 'XtdRelAssignsMeasures' } | { __typename: 'XtdRelAssignsProperties' } | { __typename: 'XtdRelAssignsPropertyWithValues' } | { __typename: 'XtdRelAssignsUnits' } | { __typename: 'XtdRelAssignsValues' } | { __typename: 'XtdRelAssociates' } | { __typename: 'XtdRelCollects' } | { __typename: 'XtdRelComposes' } | { __typename: 'XtdRelDocuments' } | { __typename: 'XtdRelGroups' } | { __typename: 'XtdRelSequences' } | { __typename: 'XtdRelSpecializes' } | (
    { __typename: 'XtdSubject' }
    & ObjectDetailProps_XtdSubject_Fragment
  ) | (
    { __typename: 'XtdUnit' }
    & ObjectDetailProps_XtdUnit_Fragment
  ) | (
    { __typename: 'XtdValue' }
    & ObjectDetailProps_XtdValue_Fragment
  )> };

export type GetCollectionEntryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCollectionEntryQuery = { __typename: 'Query', node?: Maybe<{ __typename: 'XtdActivity' } | { __typename: 'XtdActor' } | (
    { __typename: 'XtdBag' }
    & CollectionDetailProps_XtdBag_Fragment
  ) | { __typename: 'XtdClassification' } | { __typename: 'XtdExternalDocument' } | { __typename: 'XtdMeasureWithUnit' } | (
    { __typename: 'XtdNest' }
    & CollectionDetailProps_XtdNest_Fragment
  ) | { __typename: 'XtdProperty' } | { __typename: 'XtdRelActsUpon' } | { __typename: 'XtdRelAssignsCollections' } | { __typename: 'XtdRelAssignsMeasures' } | { __typename: 'XtdRelAssignsProperties' } | { __typename: 'XtdRelAssignsPropertyWithValues' } | { __typename: 'XtdRelAssignsUnits' } | { __typename: 'XtdRelAssignsValues' } | { __typename: 'XtdRelAssociates' } | { __typename: 'XtdRelCollects' } | { __typename: 'XtdRelComposes' } | { __typename: 'XtdRelDocuments' } | { __typename: 'XtdRelGroups' } | { __typename: 'XtdRelSequences' } | { __typename: 'XtdRelSpecializes' } | { __typename: 'XtdSubject' } | { __typename: 'XtdUnit' } | { __typename: 'XtdValue' }> };

export type BagQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BagQuery = { __typename: 'Query', bag?: Maybe<(
    { __typename: 'XtdBag' }
    & CollectionDetailProps_XtdBag_Fragment
  )> };

export type BagListQueryVariables = Exact<{
  input?: Maybe<FilterInput>;
}>;


export type BagListQuery = { __typename: 'Query', bags: { __typename: 'XtdBagConnection', totalElements: number, nodes: Array<(
      { __typename: 'XtdBag' }
      & CollectionProps_XtdBag_Fragment
    )>, pageInfo: (
      { __typename: 'PageInfo' }
      & PagePropsFragment
    ) } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename: 'Query', profile: (
    { __typename: 'Profile' }
    & UserProfileFragment
  ) };

export const SearchResultFragmentDoc = gql`
    fragment SearchResult on Concept {
  id
  name
  description
}
    `;
export const LanguagePropsFragmentDoc = gql`
    fragment LanguageProps on Language {
  id
  languageTag
  displayCountry(input: {languageTag: "de"})
  displayLanguage(input: {languageTag: "de"})
}
    `;
export const TranslationPropsFragmentDoc = gql`
    fragment TranslationProps on Translation {
  id
  language {
    ...LanguageProps
  }
  value
}
    ${LanguagePropsFragmentDoc}`;
export const DomainClassPropsFragmentDoc = gql`
    fragment DomainClassProps on XtdObject {
  id
  created
  createdBy
  lastModified
  lastModifiedBy
  versionId
  versionDate
  name
  names {
    ...TranslationProps
  }
  descriptions {
    ...TranslationProps
  }
}
    ${TranslationPropsFragmentDoc}`;
export const DomainClassDetailsFragmentDoc = gql`
    fragment DomainClassDetails on XtdObject {
  ...DomainClassProps
}
    ${DomainClassPropsFragmentDoc}`;
export const DomainGroupPropsFragmentDoc = gql`
    fragment DomainGroupProps on XtdBag {
  id
  created
  createdBy
  lastModified
  lastModifiedBy
  versionId
  versionDate
  name
  names {
    ...TranslationProps
  }
  descriptions {
    ...TranslationProps
  }
  tags {
    id
    localizedName
  }
}
    ${TranslationPropsFragmentDoc}`;
export const DomainGroupDetailsFragmentDoc = gql`
    fragment DomainGroupDetails on XtdBag {
  ...DomainGroupProps
  collects {
    nodes {
      id
      relatedThings {
        id
        name
      }
    }
  }
}
    ${DomainGroupPropsFragmentDoc}`;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on Profile {
  username
  firstName
  lastName
  email
  organization
}
    `;
export const PagePropsFragmentDoc = gql`
    fragment PageProps on PageInfo {
  totalPages
  pageNumber
  hasNext
  hasPrevious
}
    `;
export const TagPropsFragmentDoc = gql`
    fragment TagProps on Tag {
  id
  localizedName
  localizedDescription
}
    `;
export const ConceptPropsFragmentDoc = gql`
    fragment ConceptProps on Concept {
  id
  versionId
  versionDate
  name(input: {languageTags: ["de-DE", "en-US"]})
  de: name(input: {languageTags: ["de-DE"]})
  en: name(input: {languageTags: ["en-US, en-GB"]})
  names {
    ...TranslationProps
  }
  description(input: {languageTags: ["de-DE", "en-US"]})
  descriptions {
    ...TranslationProps
  }
  tags {
    ...TagProps
  }
}
    ${TranslationPropsFragmentDoc}
${TagPropsFragmentDoc}`;
export const EntityPropsFragmentDoc = gql`
    fragment EntityProps on Entity {
  created
  createdBy
  lastModified
  lastModifiedBy
}
    `;
export const RelationshipPropsFragmentDoc = gql`
    fragment RelationshipProps on XtdRelationship {
  ...ConceptProps
  ...EntityProps
}
    ${ConceptPropsFragmentDoc}
${EntityPropsFragmentDoc}`;
export const SearchResultPropsFragmentDoc = gql`
    fragment SearchResultProps on Concept {
  id
  versionId
  versionDate
  name(input: {languageTags: ["de-DE", "en-US"]})
  de: name(input: {languageTags: ["de-DE"]})
  en: name(input: {languageTags: ["en-US, en-GB"]})
  description(input: {languageTags: ["de-DE", "en-US"]})
  tags {
    ...TagProps
  }
}
    ${TagPropsFragmentDoc}`;
export const AssignsPropertyWithValuesPropsFragmentDoc = gql`
    fragment AssignsPropertyWithValuesProps on XtdRelAssignsPropertyWithValues {
  ...RelationshipProps
  relatedProperty {
    ...SearchResultProps
  }
  relatedValues {
    ...SearchResultProps
  }
}
    ${RelationshipPropsFragmentDoc}
${SearchResultPropsFragmentDoc}`;
export const ExternalDocumentPropsFragmentDoc = gql`
    fragment ExternalDocumentProps on XtdExternalDocument {
  ...ConceptProps
  ...EntityProps
}
    ${ConceptPropsFragmentDoc}
${EntityPropsFragmentDoc}`;
export const DocumentsPropsFragmentDoc = gql`
    fragment DocumentsProps on XtdRelDocuments {
  ...RelationshipProps
  relatedThings {
    ...SearchResultProps
  }
}
    ${RelationshipPropsFragmentDoc}
${SearchResultPropsFragmentDoc}`;
export const ExternalDocumentDetailPropsFragmentDoc = gql`
    fragment ExternalDocumentDetailProps on XtdExternalDocument {
  ...ExternalDocumentProps
  documents {
    nodes {
      ...DocumentsProps
    }
  }
}
    ${ExternalDocumentPropsFragmentDoc}
${DocumentsPropsFragmentDoc}`;
export const ObjectPropsFragmentDoc = gql`
    fragment ObjectProps on XtdObject {
  ...ConceptProps
  ...EntityProps
}
    ${ConceptPropsFragmentDoc}
${EntityPropsFragmentDoc}`;
export const AssignsCollectionsPropsFragmentDoc = gql`
    fragment AssignsCollectionsProps on XtdRelAssignsCollections {
  ...RelationshipProps
  relatingObject {
    ...SearchResultProps
  }
  relatedCollections {
    ...SearchResultProps
  }
}
    ${RelationshipPropsFragmentDoc}
${SearchResultPropsFragmentDoc}`;
export const AssignsPropertiesPropsFragmentDoc = gql`
    fragment AssignsPropertiesProps on XtdRelAssignsProperties {
  ...RelationshipProps
  relatingObject {
    ...SearchResultProps
  }
  relatedProperties {
    ...SearchResultProps
  }
}
    ${RelationshipPropsFragmentDoc}
${SearchResultPropsFragmentDoc}`;
export const ObjectDetailPropsFragmentDoc = gql`
    fragment ObjectDetailProps on XtdObject {
  ...ObjectProps
  assignedCollections {
    nodes {
      ...AssignsCollectionsProps
    }
  }
  assignedProperties {
    nodes {
      ...AssignsPropertiesProps
    }
  }
}
    ${ObjectPropsFragmentDoc}
${AssignsCollectionsPropsFragmentDoc}
${AssignsPropertiesPropsFragmentDoc}`;
export const CollectionPropsFragmentDoc = gql`
    fragment CollectionProps on XtdCollection {
  ...ConceptProps
  ...EntityProps
}
    ${ConceptPropsFragmentDoc}
${EntityPropsFragmentDoc}`;
export const CollectsPropsFragmentDoc = gql`
    fragment CollectsProps on XtdRelCollects {
  ...RelationshipProps
  relatingCollection {
    ...SearchResultProps
    tags {
      ...TagProps
    }
  }
  relatedThings {
    ...SearchResultProps
  }
}
    ${RelationshipPropsFragmentDoc}
${SearchResultPropsFragmentDoc}
${TagPropsFragmentDoc}`;
export const CollectionDetailPropsFragmentDoc = gql`
    fragment CollectionDetailProps on XtdCollection {
  ...CollectionProps
  collects {
    nodes {
      ...CollectsProps
    }
  }
  collectedBy {
    nodes {
      ...CollectsProps
    }
  }
}
    ${CollectionPropsFragmentDoc}
${CollectsPropsFragmentDoc}`;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!) {
  success: confirm(token: $token)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, baseOptions);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const LoginFormDocument = gql`
    mutation LoginForm($credentials: LoginInput!) {
  token: login(input: $credentials)
}
    `;
export type LoginFormMutationFn = Apollo.MutationFunction<LoginFormMutation, LoginFormMutationVariables>;

/**
 * __useLoginFormMutation__
 *
 * To run a mutation, you first call `useLoginFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginFormMutation, { data, loading, error }] = useLoginFormMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginFormMutation(baseOptions?: Apollo.MutationHookOptions<LoginFormMutation, LoginFormMutationVariables>) {
        return Apollo.useMutation<LoginFormMutation, LoginFormMutationVariables>(LoginFormDocument, baseOptions);
      }
export type LoginFormMutationHookResult = ReturnType<typeof useLoginFormMutation>;
export type LoginFormMutationResult = Apollo.MutationResult<LoginFormMutation>;
export type LoginFormMutationOptions = Apollo.BaseMutationOptions<LoginFormMutation, LoginFormMutationVariables>;
export const SearchInputDocument = gql`
    query SearchInput($input: SearchInput) {
  search(input: $input) {
    nodes {
      ...SearchResult
    }
    pageInfo {
      ...PageProps
    }
    totalElements
  }
}
    ${SearchResultFragmentDoc}
${PagePropsFragmentDoc}`;

/**
 * __useSearchInputQuery__
 *
 * To run a query within a React component, call `useSearchInputQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchInputQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchInputQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchInputQuery(baseOptions?: Apollo.QueryHookOptions<SearchInputQuery, SearchInputQueryVariables>) {
        return Apollo.useQuery<SearchInputQuery, SearchInputQueryVariables>(SearchInputDocument, baseOptions);
      }
export function useSearchInputLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchInputQuery, SearchInputQueryVariables>) {
          return Apollo.useLazyQuery<SearchInputQuery, SearchInputQueryVariables>(SearchInputDocument, baseOptions);
        }
export type SearchInputQueryHookResult = ReturnType<typeof useSearchInputQuery>;
export type SearchInputLazyQueryHookResult = ReturnType<typeof useSearchInputLazyQuery>;
export type SearchInputQueryResult = Apollo.QueryResult<SearchInputQuery, SearchInputQueryVariables>;
export const SignupFormDocument = gql`
    mutation SignupForm($profile: SignupInput!) {
  success: signup(input: $profile)
}
    `;
export type SignupFormMutationFn = Apollo.MutationFunction<SignupFormMutation, SignupFormMutationVariables>;

/**
 * __useSignupFormMutation__
 *
 * To run a mutation, you first call `useSignupFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupFormMutation, { data, loading, error }] = useSignupFormMutation({
 *   variables: {
 *      profile: // value for 'profile'
 *   },
 * });
 */
export function useSignupFormMutation(baseOptions?: Apollo.MutationHookOptions<SignupFormMutation, SignupFormMutationVariables>) {
        return Apollo.useMutation<SignupFormMutation, SignupFormMutationVariables>(SignupFormDocument, baseOptions);
      }
export type SignupFormMutationHookResult = ReturnType<typeof useSignupFormMutation>;
export type SignupFormMutationResult = Apollo.MutationResult<SignupFormMutation>;
export type SignupFormMutationOptions = Apollo.BaseMutationOptions<SignupFormMutation, SignupFormMutationVariables>;
export const DomainClassDocument = gql`
    query DomainClass($id: ID!) {
  node(id: $id) {
    ...DomainClassDetails
  }
}
    ${DomainClassDetailsFragmentDoc}`;

/**
 * __useDomainClassQuery__
 *
 * To run a query within a React component, call `useDomainClassQuery` and pass it any options that fit your needs.
 * When your component renders, `useDomainClassQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDomainClassQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDomainClassQuery(baseOptions?: Apollo.QueryHookOptions<DomainClassQuery, DomainClassQueryVariables>) {
        return Apollo.useQuery<DomainClassQuery, DomainClassQueryVariables>(DomainClassDocument, baseOptions);
      }
export function useDomainClassLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DomainClassQuery, DomainClassQueryVariables>) {
          return Apollo.useLazyQuery<DomainClassQuery, DomainClassQueryVariables>(DomainClassDocument, baseOptions);
        }
export type DomainClassQueryHookResult = ReturnType<typeof useDomainClassQuery>;
export type DomainClassLazyQueryHookResult = ReturnType<typeof useDomainClassLazyQuery>;
export type DomainClassQueryResult = Apollo.QueryResult<DomainClassQuery, DomainClassQueryVariables>;
export const DomainClassListDocument = gql`
    query DomainClassList($input: SearchInput) {
  search(input: $input) {
    nodes {
      ...DomainClassProps
    }
    pageInfo {
      totalPages
      pageNumber
      hasNext
      hasPrevious
    }
    totalElements
  }
}
    ${DomainClassPropsFragmentDoc}`;

/**
 * __useDomainClassListQuery__
 *
 * To run a query within a React component, call `useDomainClassListQuery` and pass it any options that fit your needs.
 * When your component renders, `useDomainClassListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDomainClassListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDomainClassListQuery(baseOptions?: Apollo.QueryHookOptions<DomainClassListQuery, DomainClassListQueryVariables>) {
        return Apollo.useQuery<DomainClassListQuery, DomainClassListQueryVariables>(DomainClassListDocument, baseOptions);
      }
export function useDomainClassListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DomainClassListQuery, DomainClassListQueryVariables>) {
          return Apollo.useLazyQuery<DomainClassListQuery, DomainClassListQueryVariables>(DomainClassListDocument, baseOptions);
        }
export type DomainClassListQueryHookResult = ReturnType<typeof useDomainClassListQuery>;
export type DomainClassListLazyQueryHookResult = ReturnType<typeof useDomainClassListLazyQuery>;
export type DomainClassListQueryResult = Apollo.QueryResult<DomainClassListQuery, DomainClassListQueryVariables>;
export const TagDomainClassDocument = gql`
    mutation TagDomainClass($domainModelId: ID!, $tagId: ID!) {
  tag(conceptId: $domainModelId, tagId: $tagId) {
    ...DomainClassDetails
  }
}
    ${DomainClassDetailsFragmentDoc}`;
export type TagDomainClassMutationFn = Apollo.MutationFunction<TagDomainClassMutation, TagDomainClassMutationVariables>;

/**
 * __useTagDomainClassMutation__
 *
 * To run a mutation, you first call `useTagDomainClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagDomainClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagDomainClassMutation, { data, loading, error }] = useTagDomainClassMutation({
 *   variables: {
 *      domainModelId: // value for 'domainModelId'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useTagDomainClassMutation(baseOptions?: Apollo.MutationHookOptions<TagDomainClassMutation, TagDomainClassMutationVariables>) {
        return Apollo.useMutation<TagDomainClassMutation, TagDomainClassMutationVariables>(TagDomainClassDocument, baseOptions);
      }
export type TagDomainClassMutationHookResult = ReturnType<typeof useTagDomainClassMutation>;
export type TagDomainClassMutationResult = Apollo.MutationResult<TagDomainClassMutation>;
export type TagDomainClassMutationOptions = Apollo.BaseMutationOptions<TagDomainClassMutation, TagDomainClassMutationVariables>;
export const DomainGroupDocument = gql`
    query DomainGroup($id: ID!) {
  node(id: $id) {
    ...DomainGroupDetails
  }
}
    ${DomainGroupDetailsFragmentDoc}`;

/**
 * __useDomainGroupQuery__
 *
 * To run a query within a React component, call `useDomainGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useDomainGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDomainGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDomainGroupQuery(baseOptions?: Apollo.QueryHookOptions<DomainGroupQuery, DomainGroupQueryVariables>) {
        return Apollo.useQuery<DomainGroupQuery, DomainGroupQueryVariables>(DomainGroupDocument, baseOptions);
      }
export function useDomainGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DomainGroupQuery, DomainGroupQueryVariables>) {
          return Apollo.useLazyQuery<DomainGroupQuery, DomainGroupQueryVariables>(DomainGroupDocument, baseOptions);
        }
export type DomainGroupQueryHookResult = ReturnType<typeof useDomainGroupQuery>;
export type DomainGroupLazyQueryHookResult = ReturnType<typeof useDomainGroupLazyQuery>;
export type DomainGroupQueryResult = Apollo.QueryResult<DomainGroupQuery, DomainGroupQueryVariables>;
export const DomainGroupListDocument = gql`
    query DomainGroupList($input: FilterInput) {
  bags(input: $input) {
    nodes {
      ...DomainGroupProps
    }
    pageInfo {
      totalPages
      pageNumber
      hasNext
      hasPrevious
    }
    totalElements
  }
}
    ${DomainGroupPropsFragmentDoc}`;

/**
 * __useDomainGroupListQuery__
 *
 * To run a query within a React component, call `useDomainGroupListQuery` and pass it any options that fit your needs.
 * When your component renders, `useDomainGroupListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDomainGroupListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDomainGroupListQuery(baseOptions?: Apollo.QueryHookOptions<DomainGroupListQuery, DomainGroupListQueryVariables>) {
        return Apollo.useQuery<DomainGroupListQuery, DomainGroupListQueryVariables>(DomainGroupListDocument, baseOptions);
      }
export function useDomainGroupListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DomainGroupListQuery, DomainGroupListQueryVariables>) {
          return Apollo.useLazyQuery<DomainGroupListQuery, DomainGroupListQueryVariables>(DomainGroupListDocument, baseOptions);
        }
export type DomainGroupListQueryHookResult = ReturnType<typeof useDomainGroupListQuery>;
export type DomainGroupListLazyQueryHookResult = ReturnType<typeof useDomainGroupListLazyQuery>;
export type DomainGroupListQueryResult = Apollo.QueryResult<DomainGroupListQuery, DomainGroupListQueryVariables>;
export const TagDomainGroupDocument = gql`
    mutation TagDomainGroup($domainModelId: ID!, $tagId: ID!) {
  tag(conceptId: $domainModelId, tagId: $tagId) {
    ...DomainGroupDetails
  }
}
    ${DomainGroupDetailsFragmentDoc}`;
export type TagDomainGroupMutationFn = Apollo.MutationFunction<TagDomainGroupMutation, TagDomainGroupMutationVariables>;

/**
 * __useTagDomainGroupMutation__
 *
 * To run a mutation, you first call `useTagDomainGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagDomainGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagDomainGroupMutation, { data, loading, error }] = useTagDomainGroupMutation({
 *   variables: {
 *      domainModelId: // value for 'domainModelId'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useTagDomainGroupMutation(baseOptions?: Apollo.MutationHookOptions<TagDomainGroupMutation, TagDomainGroupMutationVariables>) {
        return Apollo.useMutation<TagDomainGroupMutation, TagDomainGroupMutationVariables>(TagDomainGroupDocument, baseOptions);
      }
export type TagDomainGroupMutationHookResult = ReturnType<typeof useTagDomainGroupMutation>;
export type TagDomainGroupMutationResult = Apollo.MutationResult<TagDomainGroupMutation>;
export type TagDomainGroupMutationOptions = Apollo.BaseMutationOptions<TagDomainGroupMutation, TagDomainGroupMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: ProfileUpdateInput!) {
  updateProfile(input: $input) {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const CreateEntryDocument = gql`
    mutation CreateEntry($input: CreateEntryInput!) {
  createEntry(input: $input) {
    entry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type CreateEntryMutationFn = Apollo.MutationFunction<CreateEntryMutation, CreateEntryMutationVariables>;

/**
 * __useCreateEntryMutation__
 *
 * To run a mutation, you first call `useCreateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEntryMutation, { data, loading, error }] = useCreateEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateEntryMutation, CreateEntryMutationVariables>) {
        return Apollo.useMutation<CreateEntryMutation, CreateEntryMutationVariables>(CreateEntryDocument, baseOptions);
      }
export type CreateEntryMutationHookResult = ReturnType<typeof useCreateEntryMutation>;
export type CreateEntryMutationResult = Apollo.MutationResult<CreateEntryMutation>;
export type CreateEntryMutationOptions = Apollo.BaseMutationOptions<CreateEntryMutation, CreateEntryMutationVariables>;
export const DeleteEntryDocument = gql`
    mutation DeleteEntry($id: ID!) {
  deleteEntry(input: {id: $id}) {
    entry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type DeleteEntryMutationFn = Apollo.MutationFunction<DeleteEntryMutation, DeleteEntryMutationVariables>;

/**
 * __useDeleteEntryMutation__
 *
 * To run a mutation, you first call `useDeleteEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEntryMutation, { data, loading, error }] = useDeleteEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEntryMutation, DeleteEntryMutationVariables>) {
        return Apollo.useMutation<DeleteEntryMutation, DeleteEntryMutationVariables>(DeleteEntryDocument, baseOptions);
      }
export type DeleteEntryMutationHookResult = ReturnType<typeof useDeleteEntryMutation>;
export type DeleteEntryMutationResult = Apollo.MutationResult<DeleteEntryMutation>;
export type DeleteEntryMutationOptions = Apollo.BaseMutationOptions<DeleteEntryMutation, DeleteEntryMutationVariables>;
export const SetVersionDocument = gql`
    mutation SetVersion($input: SetVersionInput!) {
  setVersion(input: $input) {
    entry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type SetVersionMutationFn = Apollo.MutationFunction<SetVersionMutation, SetVersionMutationVariables>;

/**
 * __useSetVersionMutation__
 *
 * To run a mutation, you first call `useSetVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setVersionMutation, { data, loading, error }] = useSetVersionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetVersionMutation(baseOptions?: Apollo.MutationHookOptions<SetVersionMutation, SetVersionMutationVariables>) {
        return Apollo.useMutation<SetVersionMutation, SetVersionMutationVariables>(SetVersionDocument, baseOptions);
      }
export type SetVersionMutationHookResult = ReturnType<typeof useSetVersionMutation>;
export type SetVersionMutationResult = Apollo.MutationResult<SetVersionMutation>;
export type SetVersionMutationOptions = Apollo.BaseMutationOptions<SetVersionMutation, SetVersionMutationVariables>;
export const AddNameDocument = gql`
    mutation AddName($input: AddNameInput!) {
  addName(input: $input) {
    entry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type AddNameMutationFn = Apollo.MutationFunction<AddNameMutation, AddNameMutationVariables>;

/**
 * __useAddNameMutation__
 *
 * To run a mutation, you first call `useAddNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNameMutation, { data, loading, error }] = useAddNameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNameMutation(baseOptions?: Apollo.MutationHookOptions<AddNameMutation, AddNameMutationVariables>) {
        return Apollo.useMutation<AddNameMutation, AddNameMutationVariables>(AddNameDocument, baseOptions);
      }
export type AddNameMutationHookResult = ReturnType<typeof useAddNameMutation>;
export type AddNameMutationResult = Apollo.MutationResult<AddNameMutation>;
export type AddNameMutationOptions = Apollo.BaseMutationOptions<AddNameMutation, AddNameMutationVariables>;
export const UpdateNameDocument = gql`
    mutation UpdateName($input: UpdateNameInput!) {
  updateName(input: $input) {
    entry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type UpdateNameMutationFn = Apollo.MutationFunction<UpdateNameMutation, UpdateNameMutationVariables>;

/**
 * __useUpdateNameMutation__
 *
 * To run a mutation, you first call `useUpdateNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNameMutation, { data, loading, error }] = useUpdateNameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNameMutation, UpdateNameMutationVariables>) {
        return Apollo.useMutation<UpdateNameMutation, UpdateNameMutationVariables>(UpdateNameDocument, baseOptions);
      }
export type UpdateNameMutationHookResult = ReturnType<typeof useUpdateNameMutation>;
export type UpdateNameMutationResult = Apollo.MutationResult<UpdateNameMutation>;
export type UpdateNameMutationOptions = Apollo.BaseMutationOptions<UpdateNameMutation, UpdateNameMutationVariables>;
export const DeleteNameDocument = gql`
    mutation DeleteName($input: DeleteNameInput!) {
  deleteName(input: $input) {
    entry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type DeleteNameMutationFn = Apollo.MutationFunction<DeleteNameMutation, DeleteNameMutationVariables>;

/**
 * __useDeleteNameMutation__
 *
 * To run a mutation, you first call `useDeleteNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNameMutation, { data, loading, error }] = useDeleteNameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteNameMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNameMutation, DeleteNameMutationVariables>) {
        return Apollo.useMutation<DeleteNameMutation, DeleteNameMutationVariables>(DeleteNameDocument, baseOptions);
      }
export type DeleteNameMutationHookResult = ReturnType<typeof useDeleteNameMutation>;
export type DeleteNameMutationResult = Apollo.MutationResult<DeleteNameMutation>;
export type DeleteNameMutationOptions = Apollo.BaseMutationOptions<DeleteNameMutation, DeleteNameMutationVariables>;
export const AddDescriptionDocument = gql`
    mutation AddDescription($input: AddDescriptionInput!) {
  addDescription(input: $input) {
    entry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type AddDescriptionMutationFn = Apollo.MutationFunction<AddDescriptionMutation, AddDescriptionMutationVariables>;

/**
 * __useAddDescriptionMutation__
 *
 * To run a mutation, you first call `useAddDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDescriptionMutation, { data, loading, error }] = useAddDescriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<AddDescriptionMutation, AddDescriptionMutationVariables>) {
        return Apollo.useMutation<AddDescriptionMutation, AddDescriptionMutationVariables>(AddDescriptionDocument, baseOptions);
      }
export type AddDescriptionMutationHookResult = ReturnType<typeof useAddDescriptionMutation>;
export type AddDescriptionMutationResult = Apollo.MutationResult<AddDescriptionMutation>;
export type AddDescriptionMutationOptions = Apollo.BaseMutationOptions<AddDescriptionMutation, AddDescriptionMutationVariables>;
export const UpdateDescriptionDocument = gql`
    mutation UpdateDescription($input: UpdateDescriptionInput!) {
  updateDescription(input: $input) {
    entry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type UpdateDescriptionMutationFn = Apollo.MutationFunction<UpdateDescriptionMutation, UpdateDescriptionMutationVariables>;

/**
 * __useUpdateDescriptionMutation__
 *
 * To run a mutation, you first call `useUpdateDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDescriptionMutation, { data, loading, error }] = useUpdateDescriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDescriptionMutation, UpdateDescriptionMutationVariables>) {
        return Apollo.useMutation<UpdateDescriptionMutation, UpdateDescriptionMutationVariables>(UpdateDescriptionDocument, baseOptions);
      }
export type UpdateDescriptionMutationHookResult = ReturnType<typeof useUpdateDescriptionMutation>;
export type UpdateDescriptionMutationResult = Apollo.MutationResult<UpdateDescriptionMutation>;
export type UpdateDescriptionMutationOptions = Apollo.BaseMutationOptions<UpdateDescriptionMutation, UpdateDescriptionMutationVariables>;
export const DeleteDescriptionDocument = gql`
    mutation DeleteDescription($input: DeleteDescriptionInput!) {
  deleteDescription(input: $input) {
    entry {
      ...ConceptProps
    }
  }
}
    ${ConceptPropsFragmentDoc}`;
export type DeleteDescriptionMutationFn = Apollo.MutationFunction<DeleteDescriptionMutation, DeleteDescriptionMutationVariables>;

/**
 * __useDeleteDescriptionMutation__
 *
 * To run a mutation, you first call `useDeleteDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDescriptionMutation, { data, loading, error }] = useDeleteDescriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDescriptionMutation, DeleteDescriptionMutationVariables>) {
        return Apollo.useMutation<DeleteDescriptionMutation, DeleteDescriptionMutationVariables>(DeleteDescriptionDocument, baseOptions);
      }
export type DeleteDescriptionMutationHookResult = ReturnType<typeof useDeleteDescriptionMutation>;
export type DeleteDescriptionMutationResult = Apollo.MutationResult<DeleteDescriptionMutation>;
export type DeleteDescriptionMutationOptions = Apollo.BaseMutationOptions<DeleteDescriptionMutation, DeleteDescriptionMutationVariables>;
export const CreateOneToManyRelationshipDocument = gql`
    mutation CreateOneToManyRelationship($input: CreateOneToManyRelationshipInput!) {
  createOneToManyRelationship(input: $input) {
    relationship {
      ... on XtdRelationship {
        id
      }
    }
  }
}
    `;
export type CreateOneToManyRelationshipMutationFn = Apollo.MutationFunction<CreateOneToManyRelationshipMutation, CreateOneToManyRelationshipMutationVariables>;

/**
 * __useCreateOneToManyRelationshipMutation__
 *
 * To run a mutation, you first call `useCreateOneToManyRelationshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneToManyRelationshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneToManyRelationshipMutation, { data, loading, error }] = useCreateOneToManyRelationshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOneToManyRelationshipMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneToManyRelationshipMutation, CreateOneToManyRelationshipMutationVariables>) {
        return Apollo.useMutation<CreateOneToManyRelationshipMutation, CreateOneToManyRelationshipMutationVariables>(CreateOneToManyRelationshipDocument, baseOptions);
      }
export type CreateOneToManyRelationshipMutationHookResult = ReturnType<typeof useCreateOneToManyRelationshipMutation>;
export type CreateOneToManyRelationshipMutationResult = Apollo.MutationResult<CreateOneToManyRelationshipMutation>;
export type CreateOneToManyRelationshipMutationOptions = Apollo.BaseMutationOptions<CreateOneToManyRelationshipMutation, CreateOneToManyRelationshipMutationVariables>;
export const UpdateOneToManyRelationshipDocument = gql`
    mutation UpdateOneToManyRelationship($oldId: ID!, $input: CreateOneToManyRelationshipInput!) {
  deleteRelationship(input: {id: $oldId}) {
    relationship {
      ... on XtdRelationship {
        id
      }
    }
  }
  createOneToManyRelationship(input: $input) {
    relationship {
      ... on XtdRelationship {
        id
      }
    }
  }
}
    `;
export type UpdateOneToManyRelationshipMutationFn = Apollo.MutationFunction<UpdateOneToManyRelationshipMutation, UpdateOneToManyRelationshipMutationVariables>;

/**
 * __useUpdateOneToManyRelationshipMutation__
 *
 * To run a mutation, you first call `useUpdateOneToManyRelationshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneToManyRelationshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneToManyRelationshipMutation, { data, loading, error }] = useUpdateOneToManyRelationshipMutation({
 *   variables: {
 *      oldId: // value for 'oldId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOneToManyRelationshipMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneToManyRelationshipMutation, UpdateOneToManyRelationshipMutationVariables>) {
        return Apollo.useMutation<UpdateOneToManyRelationshipMutation, UpdateOneToManyRelationshipMutationVariables>(UpdateOneToManyRelationshipDocument, baseOptions);
      }
export type UpdateOneToManyRelationshipMutationHookResult = ReturnType<typeof useUpdateOneToManyRelationshipMutation>;
export type UpdateOneToManyRelationshipMutationResult = Apollo.MutationResult<UpdateOneToManyRelationshipMutation>;
export type UpdateOneToManyRelationshipMutationOptions = Apollo.BaseMutationOptions<UpdateOneToManyRelationshipMutation, UpdateOneToManyRelationshipMutationVariables>;
export const DeleteRelationshipDocument = gql`
    mutation DeleteRelationship($input: DeleteRelationshipInput!) {
  deleteRelationship(input: $input) {
    relationship {
      ... on XtdRelationship {
        id
      }
    }
  }
}
    `;
export type DeleteRelationshipMutationFn = Apollo.MutationFunction<DeleteRelationshipMutation, DeleteRelationshipMutationVariables>;

/**
 * __useDeleteRelationshipMutation__
 *
 * To run a mutation, you first call `useDeleteRelationshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRelationshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRelationshipMutation, { data, loading, error }] = useDeleteRelationshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRelationshipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRelationshipMutation, DeleteRelationshipMutationVariables>) {
        return Apollo.useMutation<DeleteRelationshipMutation, DeleteRelationshipMutationVariables>(DeleteRelationshipDocument, baseOptions);
      }
export type DeleteRelationshipMutationHookResult = ReturnType<typeof useDeleteRelationshipMutation>;
export type DeleteRelationshipMutationResult = Apollo.MutationResult<DeleteRelationshipMutation>;
export type DeleteRelationshipMutationOptions = Apollo.BaseMutationOptions<DeleteRelationshipMutation, DeleteRelationshipMutationVariables>;
export const TagBagDocument = gql`
    mutation TagBag($bagId: ID!, $tagId: ID!) {
  tag(conceptId: $bagId, tagId: $tagId) {
    ...CollectionDetailProps
  }
}
    ${CollectionDetailPropsFragmentDoc}`;
export type TagBagMutationFn = Apollo.MutationFunction<TagBagMutation, TagBagMutationVariables>;

/**
 * __useTagBagMutation__
 *
 * To run a mutation, you first call `useTagBagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTagBagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tagBagMutation, { data, loading, error }] = useTagBagMutation({
 *   variables: {
 *      bagId: // value for 'bagId'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useTagBagMutation(baseOptions?: Apollo.MutationHookOptions<TagBagMutation, TagBagMutationVariables>) {
        return Apollo.useMutation<TagBagMutation, TagBagMutationVariables>(TagBagDocument, baseOptions);
      }
export type TagBagMutationHookResult = ReturnType<typeof useTagBagMutation>;
export type TagBagMutationResult = Apollo.MutationResult<TagBagMutation>;
export type TagBagMutationOptions = Apollo.BaseMutationOptions<TagBagMutation, TagBagMutationVariables>;
export const FindLanguagesDocument = gql`
    query FindLanguages($input: LanguageFilterInput!) {
  languages(input: $input) {
    nodes {
      ...LanguageProps
    }
    totalElements
  }
}
    ${LanguagePropsFragmentDoc}`;

/**
 * __useFindLanguagesQuery__
 *
 * To run a query within a React component, call `useFindLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLanguagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindLanguagesQuery(baseOptions?: Apollo.QueryHookOptions<FindLanguagesQuery, FindLanguagesQueryVariables>) {
        return Apollo.useQuery<FindLanguagesQuery, FindLanguagesQueryVariables>(FindLanguagesDocument, baseOptions);
      }
export function useFindLanguagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindLanguagesQuery, FindLanguagesQueryVariables>) {
          return Apollo.useLazyQuery<FindLanguagesQuery, FindLanguagesQueryVariables>(FindLanguagesDocument, baseOptions);
        }
export type FindLanguagesQueryHookResult = ReturnType<typeof useFindLanguagesQuery>;
export type FindLanguagesLazyQueryHookResult = ReturnType<typeof useFindLanguagesLazyQuery>;
export type FindLanguagesQueryResult = Apollo.QueryResult<FindLanguagesQuery, FindLanguagesQueryVariables>;
export const FindConceptDocument = gql`
    query FindConcept($input: SearchInput!) {
  search(input: $input) {
    nodes {
      ...SearchResultProps
    }
    totalElements
  }
}
    ${SearchResultPropsFragmentDoc}`;

/**
 * __useFindConceptQuery__
 *
 * To run a query within a React component, call `useFindConceptQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindConceptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindConceptQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindConceptQuery(baseOptions?: Apollo.QueryHookOptions<FindConceptQuery, FindConceptQueryVariables>) {
        return Apollo.useQuery<FindConceptQuery, FindConceptQueryVariables>(FindConceptDocument, baseOptions);
      }
export function useFindConceptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindConceptQuery, FindConceptQueryVariables>) {
          return Apollo.useLazyQuery<FindConceptQuery, FindConceptQueryVariables>(FindConceptDocument, baseOptions);
        }
export type FindConceptQueryHookResult = ReturnType<typeof useFindConceptQuery>;
export type FindConceptLazyQueryHookResult = ReturnType<typeof useFindConceptLazyQuery>;
export type FindConceptQueryResult = Apollo.QueryResult<FindConceptQuery, FindConceptQueryVariables>;
export const PropertyTreeDocument = gql`
    query PropertyTree {
  hierarchy(input: {rootNodeFilter: {entryTypeIn: [Bag], tagged: ["6f96aaa7-e08f-49bb-ac63-93061d4c5db2"]}}) {
    nodes {
      ...ConceptProps
    }
    paths
  }
}
    ${ConceptPropsFragmentDoc}`;

/**
 * __usePropertyTreeQuery__
 *
 * To run a query within a React component, call `usePropertyTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertyTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropertyTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function usePropertyTreeQuery(baseOptions?: Apollo.QueryHookOptions<PropertyTreeQuery, PropertyTreeQueryVariables>) {
        return Apollo.useQuery<PropertyTreeQuery, PropertyTreeQueryVariables>(PropertyTreeDocument, baseOptions);
      }
export function usePropertyTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PropertyTreeQuery, PropertyTreeQueryVariables>) {
          return Apollo.useLazyQuery<PropertyTreeQuery, PropertyTreeQueryVariables>(PropertyTreeDocument, baseOptions);
        }
export type PropertyTreeQueryHookResult = ReturnType<typeof usePropertyTreeQuery>;
export type PropertyTreeLazyQueryHookResult = ReturnType<typeof usePropertyTreeLazyQuery>;
export type PropertyTreeQueryResult = Apollo.QueryResult<PropertyTreeQuery, PropertyTreeQueryVariables>;
export const ExternalDocumentDocument = gql`
    query ExternalDocument($id: ID!) {
  externalDocument(id: $id) {
    ...ExternalDocumentDetailProps
  }
}
    ${ExternalDocumentDetailPropsFragmentDoc}`;

/**
 * __useExternalDocumentQuery__
 *
 * To run a query within a React component, call `useExternalDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useExternalDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExternalDocumentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExternalDocumentQuery(baseOptions?: Apollo.QueryHookOptions<ExternalDocumentQuery, ExternalDocumentQueryVariables>) {
        return Apollo.useQuery<ExternalDocumentQuery, ExternalDocumentQueryVariables>(ExternalDocumentDocument, baseOptions);
      }
export function useExternalDocumentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExternalDocumentQuery, ExternalDocumentQueryVariables>) {
          return Apollo.useLazyQuery<ExternalDocumentQuery, ExternalDocumentQueryVariables>(ExternalDocumentDocument, baseOptions);
        }
export type ExternalDocumentQueryHookResult = ReturnType<typeof useExternalDocumentQuery>;
export type ExternalDocumentLazyQueryHookResult = ReturnType<typeof useExternalDocumentLazyQuery>;
export type ExternalDocumentQueryResult = Apollo.QueryResult<ExternalDocumentQuery, ExternalDocumentQueryVariables>;
export const SubjectsDocument = gql`
    query Subjects($input: FilterInput) {
  subjects(input: $input) {
    nodes {
      ...ObjectProps
    }
    pageInfo {
      ...PageProps
    }
    totalElements
  }
}
    ${ObjectPropsFragmentDoc}
${PagePropsFragmentDoc}`;

/**
 * __useSubjectsQuery__
 *
 * To run a query within a React component, call `useSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<SubjectsQuery, SubjectsQueryVariables>) {
        return Apollo.useQuery<SubjectsQuery, SubjectsQueryVariables>(SubjectsDocument, baseOptions);
      }
export function useSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectsQuery, SubjectsQueryVariables>) {
          return Apollo.useLazyQuery<SubjectsQuery, SubjectsQueryVariables>(SubjectsDocument, baseOptions);
        }
export type SubjectsQueryHookResult = ReturnType<typeof useSubjectsQuery>;
export type SubjectsLazyQueryHookResult = ReturnType<typeof useSubjectsLazyQuery>;
export type SubjectsQueryResult = Apollo.QueryResult<SubjectsQuery, SubjectsQueryVariables>;
export const GetObjectEntryDocument = gql`
    query GetObjectEntry($id: ID!) {
  node(id: $id) {
    ...ObjectDetailProps
  }
}
    ${ObjectDetailPropsFragmentDoc}`;

/**
 * __useGetObjectEntryQuery__
 *
 * To run a query within a React component, call `useGetObjectEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetObjectEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetObjectEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetObjectEntryQuery(baseOptions?: Apollo.QueryHookOptions<GetObjectEntryQuery, GetObjectEntryQueryVariables>) {
        return Apollo.useQuery<GetObjectEntryQuery, GetObjectEntryQueryVariables>(GetObjectEntryDocument, baseOptions);
      }
export function useGetObjectEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetObjectEntryQuery, GetObjectEntryQueryVariables>) {
          return Apollo.useLazyQuery<GetObjectEntryQuery, GetObjectEntryQueryVariables>(GetObjectEntryDocument, baseOptions);
        }
export type GetObjectEntryQueryHookResult = ReturnType<typeof useGetObjectEntryQuery>;
export type GetObjectEntryLazyQueryHookResult = ReturnType<typeof useGetObjectEntryLazyQuery>;
export type GetObjectEntryQueryResult = Apollo.QueryResult<GetObjectEntryQuery, GetObjectEntryQueryVariables>;
export const GetCollectionEntryDocument = gql`
    query GetCollectionEntry($id: ID!) {
  node(id: $id) {
    ...CollectionDetailProps
  }
}
    ${CollectionDetailPropsFragmentDoc}`;

/**
 * __useGetCollectionEntryQuery__
 *
 * To run a query within a React component, call `useGetCollectionEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionEntryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCollectionEntryQuery(baseOptions?: Apollo.QueryHookOptions<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>) {
        return Apollo.useQuery<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>(GetCollectionEntryDocument, baseOptions);
      }
export function useGetCollectionEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>) {
          return Apollo.useLazyQuery<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>(GetCollectionEntryDocument, baseOptions);
        }
export type GetCollectionEntryQueryHookResult = ReturnType<typeof useGetCollectionEntryQuery>;
export type GetCollectionEntryLazyQueryHookResult = ReturnType<typeof useGetCollectionEntryLazyQuery>;
export type GetCollectionEntryQueryResult = Apollo.QueryResult<GetCollectionEntryQuery, GetCollectionEntryQueryVariables>;
export const BagDocument = gql`
    query Bag($id: ID!) {
  bag(id: $id) {
    ...CollectionDetailProps
  }
}
    ${CollectionDetailPropsFragmentDoc}`;

/**
 * __useBagQuery__
 *
 * To run a query within a React component, call `useBagQuery` and pass it any options that fit your needs.
 * When your component renders, `useBagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBagQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBagQuery(baseOptions?: Apollo.QueryHookOptions<BagQuery, BagQueryVariables>) {
        return Apollo.useQuery<BagQuery, BagQueryVariables>(BagDocument, baseOptions);
      }
export function useBagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BagQuery, BagQueryVariables>) {
          return Apollo.useLazyQuery<BagQuery, BagQueryVariables>(BagDocument, baseOptions);
        }
export type BagQueryHookResult = ReturnType<typeof useBagQuery>;
export type BagLazyQueryHookResult = ReturnType<typeof useBagLazyQuery>;
export type BagQueryResult = Apollo.QueryResult<BagQuery, BagQueryVariables>;
export const BagListDocument = gql`
    query BagList($input: FilterInput) {
  bags(input: $input) {
    nodes {
      ...CollectionProps
    }
    pageInfo {
      ...PageProps
    }
    totalElements
  }
}
    ${CollectionPropsFragmentDoc}
${PagePropsFragmentDoc}`;

/**
 * __useBagListQuery__
 *
 * To run a query within a React component, call `useBagListQuery` and pass it any options that fit your needs.
 * When your component renders, `useBagListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBagListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBagListQuery(baseOptions?: Apollo.QueryHookOptions<BagListQuery, BagListQueryVariables>) {
        return Apollo.useQuery<BagListQuery, BagListQueryVariables>(BagListDocument, baseOptions);
      }
export function useBagListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BagListQuery, BagListQueryVariables>) {
          return Apollo.useLazyQuery<BagListQuery, BagListQueryVariables>(BagListDocument, baseOptions);
        }
export type BagListQueryHookResult = ReturnType<typeof useBagListQuery>;
export type BagListLazyQueryHookResult = ReturnType<typeof useBagListLazyQuery>;
export type BagListQueryResult = Apollo.QueryResult<BagListQuery, BagListQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, baseOptions);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, baseOptions);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;