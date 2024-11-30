import { useMemo } from "react";

export const useGenerateUniqueListId  = (list) => {
    const randomValue = useMemo(() => Math.random(), []);

    const updatedList = useMemo(() => {
        return list?.map((item) => ({
            ...item,
            listId: randomValue,
        }));
    }, [list, randomValue]);

    return updatedList;
};