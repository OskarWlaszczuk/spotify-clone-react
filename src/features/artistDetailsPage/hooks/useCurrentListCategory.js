import { useState } from "react";
import { findMatchingValueByKey } from "../../../common/functions/findMatchingValueByKey";

export const useCurrentListCategory = (initialListCategory, list) => {

    const [currentListCategory, setCurrentListCategory] = useState(initialListCategory);

    const listMachtedByCategory = findMatchingValueByKey(list, currentListCategory);

    return { listMachtedByCategory, currentListCategory, setCurrentListCategory };
};