export const removeDuplicates = (list = [], key) => {
    const caughtDuplicates = new Set();

    return list.filter(key => {
        const keyValue = key;
        return !caughtDuplicates.has(keyValue) && caughtDuplicates.add(keyValue);
    });
};