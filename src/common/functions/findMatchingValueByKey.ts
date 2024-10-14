import { ListDataGroup } from "../interfaces/ListDataGroup";
import { isMatch } from "./isMatch";


export const findMatchingValueByKey = (items: ListDataGroup[], targetKey: string): ListDataGroup | undefined => (
    items.find(({ key }) => isMatch(key, targetKey))
)