// export const getSpecificKeys = <T>(object: T, keysToGetList: string[]) => {
//     const objectArray = Array(object);

//     const getNestedKey = (object: T, nestedKeyToGet: string) => (
//         nestedKeyToGet.split('.').reduce(
//             (currentObjectKey, keyToGet) => currentObjectKey && currentObjectKey[keyToGet], object
//         )
//     );

//     return objectArray?.map((objectKey) => {
//         const selectedKeys = {};
//         keysToGetList.forEach(key => {
//             const selectedKeyValue = getNestedKey(objectKey, key);
//             if (selectedKeyValue !== undefined) {
//                 selectedKeys[key] = selectedKeyValue;
//             }
//         });
//         return selectedKeys;
//     });
// };


export const getSpecificKeys = <T>(object: T, keysToGetList: string[]) => {
    const objectArray = Array.isArray(object) ? object : [object];

    return objectArray?.map((objectKey: any) => {
        const selectedKeysList: any = {};

        keysToGetList.forEach(key => {
            const selectedKey = objectKey?.[key];

            if (selectedKey !== undefined) {
                selectedKeysList[key] = selectedKey;
            }
        });
        return selectedKeysList;
    });
};

