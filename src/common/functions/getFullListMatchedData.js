import { findMatchingValueByKey } from "./findMatchingValueByKey";

export const getFullListMatchedData = (fullListsDataOptions, type) => {

    const matchedFullListDataByType = findMatchingValueByKey(fullListsDataOptions, type);

    const fullListContent = matchedFullListDataByType?.value;
    const fullListTitle = matchedFullListDataByType?.title;
    const isFullListArtistsList = matchedFullListDataByType?.isArtistsList;

    return { fullListContent, fullListTitle, isFullListArtistsList };
};