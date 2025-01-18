import {isMatch} from "./isMatch";

export const findMatchingOptionByKey = <Option extends { key: string }>(
    options: Option[],
    targetKey: string,
) => (
    options.find(({key}) => isMatch(key, targetKey))
);