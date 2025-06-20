import { useMemo } from "react";
import { ObjectPropsFragment } from "../../generated/types";

export type VTreeRootNode = {
    children: VTreeNode[]
}

export type VTreeNode = {
    id: string,
    nodeId: string,
    data: ObjectPropsFragment,
    children: VTreeNode[]
}

type UseVTreeOptions = {
    leaves: ObjectPropsFragment[],
    paths: string[]
}

const useVerification = (options: UseVTreeOptions) => {
    const {
        leaves,
        paths
    } = options;
    // Speichern eines lookup-Objektes; Beschleunigung der Baumerzeugung
    const lookupMap = useMemo(() => {
        return leaves.reduce((agg, cur) => {
            agg[cur.id] = cur;
            return agg;
        }, {} as { [key: string]: ObjectPropsFragment });
    }, [leaves]);

    // Baumstruktur erzeugen
    const rootNode = useMemo(() => {
        const result: VTreeRootNode = { children: [] };

        paths.forEach((id, idx) => {
            let parent = result; // Mapping am Wurzelknoten beginnen
            const data = lookupMap[id];

            // der Knoten kann bereits auf einem anderen Weg eingeführt worden sein; Kontrolle auf Dopplungen
            let node = parent.children.find(n => n.id === id);
            if (!node) {
                const nodeId = paths.slice(0, idx + 1).join(':') + ':' + id;
                node = { id, nodeId, data, children: [] };
                parent.children.push(node);
                parent.children.sort((a, b) => {
                    if (a.data.recordType === b.data.recordType) {
                        const nameA = a.data.name ?? a.data.id;
                        const nameB = b.data.name ?? b.data.id;
                        return nameA.localeCompare(nameB);
                    }
                    return a.data.recordType.localeCompare(b.data.recordType);
                });
            }
            parent = node;
        });

        return result;
    }, [paths, lookupMap]);

    // Darstellung über TreeView in Verification.tsx
    return {
        nodes: rootNode.children,
        lookupMap
    };
};

export default useVerification;
