import {getEntityType} from "../domain";
import ConceptChip from "./ConceptChip";
import { styled } from "@mui/material/styles";
import {CatalogRecord} from "../types";

// Replace makeStyles with styled component
const StyledConceptChip = styled(ConceptChip)({
    margin: 3
});

type CatalogEntryChipProps = {
    catalogEntry: CatalogRecord
    label?: string;
}

export default function CatalogEntryChip(props: CatalogEntryChipProps) {
    const {
        catalogEntry,
        label
    } = props;
    const { id, recordType, name, tags = [] } = catalogEntry;
    
    const tagIds = tags.map(tag => tag.id);
    const domainEntityType = getEntityType(recordType, tagIds);

    return (
        <StyledConceptChip
            key={id}
            conceptType={domainEntityType!}
            id={id}
            label={label ?? name ?? id}
            title={name ?? undefined}
        />
    );
}
