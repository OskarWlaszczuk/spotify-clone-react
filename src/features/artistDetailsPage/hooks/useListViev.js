import { useState } from "react";
import { findMatchingValueByKey } from "../../../common/functions/findMatchingValueByKey";

export const useListView = (currentListCategory, type, dataByCategory, categoryParamMappings) => {

    const paramMatchedByListCategory = findMatchingValueByKey(categoryParamMappings, currentListCategory);
    const listMatchedByParam = findMatchingValueByKey(dataByCategory, type);

    const [listView, setListView] = useState({
        list: listMatchedByParam || [],
        param: paramMatchedByListCategory || ''
    });

    return { listView, setListView };
};