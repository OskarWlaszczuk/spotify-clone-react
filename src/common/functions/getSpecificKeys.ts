export const getSpecificKeys = <T, K extends keyof T>(object: T[], keysToGetList: K[]) => {

    return object?.map((object) => {
        const selectedKeysList = {} as Pick<T, K>;

        keysToGetList.forEach((key) => {
            const selectedKey = object?.[key];

            if (selectedKey !== undefined) {
                selectedKeysList[key] = selectedKey;
            }
        });

        return selectedKeysList;
    });
};
