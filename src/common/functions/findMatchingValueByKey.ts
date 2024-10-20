import { DataByGroup } from "../interfaces/DataByGroup";
import { isMatch } from "./isMatch";

export const findMatchingValueByKey = <ValueType>(groups: DataByGroup<ValueType>[], targetKey: string): DataByGroup<ValueType> | undefined => (
    groups.find(({ key }) => isMatch(key, targetKey))
);