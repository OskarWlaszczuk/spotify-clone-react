import { useState } from "react";
import { popularReleasesCategory, albumsCategory, singlesCategory, compilationsCategory } from "../constants/categories";
import { findMatchingItemValue } from "../../../common/functions/findMatchingItemValue";

export const useCurrentListCategory = (initialListCategory, param, availableLists = {}) => {
    const [currentListCategory, setCurrentListCategory] = useState(initialListCategory);
    const { albums, singles, compilations, mergedArray, mergedArrayWithNewestFirst } = availableLists;

    const matchedListByCategory = findMatchingItemValue([
        { key: albumsCategory, value: albums },
        { key: singlesCategory, value: singles },
        { key: compilationsCategory, value: compilations },
        { key: popularReleasesCategory, value: param ? mergedArrayWithNewestFirst : mergedArray },
    ], currentListCategory);

    return { matchedListByCategory, currentListCategory, setCurrentListCategory };
};