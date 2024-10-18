import { DataByGroup } from "../interfaces/ListDataGroup";
import { isMatch } from "./isMatch";

export const findMatchingValueByKey = (groups: DataByGroup[], targetKey: string): DataByGroup | undefined => (
    groups.find(({ key }) => isMatch(key, targetKey))
);