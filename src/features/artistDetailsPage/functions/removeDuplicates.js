export const removeDuplicates = (albums = []) => {
    const caughtDuplicates = new Set();
    return albums.filter(({ name }) => {
        const keyValue = name;
        return !caughtDuplicates.has(keyValue) && caughtDuplicates.add(keyValue);
    });
};