export const removeDuplicates = (list = [], key) => {
    const caughtDuplicates = new Set();

    return list.filter(item => {
        const keyValue = item[key];
        return !caughtDuplicates.has(keyValue) && caughtDuplicates.add(keyValue);
    });
};