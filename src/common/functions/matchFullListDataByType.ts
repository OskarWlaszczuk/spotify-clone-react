import { ListDataGroup } from "../interfaces/ListDataGroup";
import { findMatchingValueByKey } from "./findMatchingValueByKey";


export const matchFullListDataByType = (fullListsDatasOptions: ListDataGroup[], type: string) => {

    const matchedFullListDataByType = findMatchingValueByKey(fullListsDatasOptions, type);

    const fullListContent = matchedFullListDataByType?.value;
    const fullListTitle = matchedFullListDataByType?.title;
    const isFullListArtistsList = matchedFullListDataByType?.isArtistsList;

    return { fullListContent, fullListTitle, isFullListArtistsList };
};