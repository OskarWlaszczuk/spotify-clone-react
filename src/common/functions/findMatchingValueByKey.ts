import { DataByGroup } from "../interfaces/DataByGroup";
import { isMatch } from "./isMatch";

export const findMatchingValueByKey = (groups: DataByGroup[], targetKey: string): DataByGroup | undefined => (
    groups.find(({ key }) => isMatch(key, targetKey))
);