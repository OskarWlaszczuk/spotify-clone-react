import { useState } from "react";
import { popularReleasesCategory, albumsCategory, singlesCategory, compilationsCategory } from "../constants/categories";
import { findMatchingValueByKey } from "../../../common/functions/findMatchingValueByKey";

export const useCurrentListCategory = (initialListCategory, param, availableLists = {}) => {

    const [currentListCategory, setCurrentListCategory] = useState(initialListCategory);
    const { albums, singles, compilations, previewAllCategoriesList, allCategoriesList } = availableLists;

    const listMachtedByCategory = findMatchingValueByKey([
        { key: albumsCategory, value: albums },
        { key: singlesCategory, value: singles },
        { key: compilationsCategory, value: compilations },
        { key: popularReleasesCategory, value: param ? previewAllCategoriesList : allCategoriesList },
    ], currentListCategory);

    return { listMachtedByCategory, currentListCategory, setCurrentListCategory };
};