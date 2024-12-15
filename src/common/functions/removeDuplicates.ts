interface RemoveDuplicatesOptions<ListItemType, ItemKey> {
    list: ListItemType[];
    key?: ItemKey | undefined;
}

export const removeDuplicates = <
    ListItemType, ItemKey extends keyof ListItemType
>({list, key}: RemoveDuplicatesOptions<ListItemType, ItemKey>) => {
    const caughtDuplicates = new Set();

    return list?.filter(item => {
        const keyValue = key !== undefined ? item[key] : item;
        return !caughtDuplicates.has(keyValue) && (
            caughtDuplicates.add(keyValue)
        );
    });
};