import { GroupData } from "../Interfaces/GroupData";
import { isMatch } from "./isMatch";

export const findMatchingValueByKey = (
    groups: GroupData[],
    targetKey: string,
) => (
    groups.find(({ key }) => isMatch(key, targetKey))
);

export interface GroupData2 {
    key: string;
    value: any;
    title?: string;
    isArtistsList?: boolean;
};

const exampleArray = [
    {
        key: "klucz1",
        value: [1, 2, 3, 4],
    },
    {
        key: "klucz2",
        value: ["str1", "str2", "str3",],
    },
    {
        key: "klucz3",
        value: [null, undefined, true, false],
    },
]

export const findMatchingValueByKey2 = (
    groups: GroupData2[],
    targetKey: string,
) => (
    groups.find(({ key }) => isMatch(key, targetKey))
);

findMatchingValueByKey2(exampleArray, "klucz2");