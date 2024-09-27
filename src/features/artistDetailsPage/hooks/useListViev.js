import { useState } from "react";
import { findMatchingValueByKey } from "../../../common/functions/findMatchingValueByKey";

export const useListView = (currentListCategory, type, list) => {

    const paramMatchedByListCategory = findMatchingValueByKey(list, currentListCategory);
    const listMatchedByParam = findMatchingValueByKey(list, type);

    const [listView, setListView] = useState({ list: listMatchedByParam, param: paramMatchedByListCategory } || null);

    return { listView, setListView };
};