import { GroupData } from "../Interfaces/GroupData";
import { findMatchingValueByKey } from "./findMatchingValueByKey";

export const getFullListMatchedData = (fullListsDataOptions: GroupData[], type: string) => {

    const matchedFullListDataByType = findMatchingValueByKey(fullListsDataOptions, type);

    const fullListContent = matchedFullListDataByType?.value;
    const fullListTitle = matchedFullListDataByType?.title;
    const isFullListArtistsList = matchedFullListDataByType?.isArtistsList;

    return { fullListContent, fullListTitle, isFullListArtistsList };
};