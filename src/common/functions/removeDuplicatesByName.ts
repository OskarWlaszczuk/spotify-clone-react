export const removeDuplicatesByName = <List extends { name: string }, >(list: List[]) => {
    const caughtDuplicates = new Set();

    return list?.filter(item => {
        if (!caughtDuplicates.has(item.name)) {
            caughtDuplicates.add(item.name);
            return true;
        }
        return false;
    });
};