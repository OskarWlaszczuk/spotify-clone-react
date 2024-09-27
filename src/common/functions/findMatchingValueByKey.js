import { isMatch } from "../../features/artistDetailsPage/functions/isMatch";

export const findMatchingValueByKey = (items, targetKey) => {

    const matchedItem = items.find(({ key }) => isMatch(key, targetKey));

    return matchedItem ? matchedItem.value : undefined;
};