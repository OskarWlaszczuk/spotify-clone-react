import { useState } from "react";
import { findMatchingValueByKey } from "../../../common/functions/findMatchingValueByKey";

export const useCurrentListCategory = (initialListCategory, categoryDataToMatch) => {

    const [currentListCategory, setCurrentListCategory] = useState(initialListCategory);

    const listMachtedByCategory = findMatchingValueByKey(categoryDataToMatch, currentListCategory);

    return { listMachtedByCategory, currentListCategory, setCurrentListCategory };
};