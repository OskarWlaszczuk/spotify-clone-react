export const getSpecificKeys = (object, keysToGetList) => {
    const objectArray = Array.isArray(object) ? object : [object];

    const getNestedKey = (object, nestedKeyToGet) => {
        return nestedKeyToGet.split('.').reduce(
            (currentObjectKey, keyToGet) => currentObjectKey && currentObjectKey[keyToGet], object
        );
    };

    return objectArray.map((objectKey) => {
        const selectedKeys = {};
        keysToGetList.forEach(key => {
            const selectedKeyValue = getNestedKey(objectKey, key);
            if (selectedKeyValue !== undefined) {
                selectedKeys[key] = selectedKeyValue;
            }
        });
        return selectedKeys;
    });
};