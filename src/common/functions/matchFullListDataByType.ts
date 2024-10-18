import { DataByGroup } from "../interfaces/DataByGroup";
import { MediaItemData } from "../interfaces/MediaItemData";
import { findMatchingValueByKey } from "./findMatchingValueByKey";

interface MatchFullListDataByTypeReturnValues {
    fullListTitle: string | undefined;
    fullListContent: MediaItemData[] | undefined;
    isFullListArtistsList: boolean | undefined;
};

export const matchFullListDataByType = (fullListsDatasOptions: DataByGroup[], type: string): MatchFullListDataByTypeReturnValues => {

    const matchedFullListDataByType = findMatchingValueByKey(fullListsDatasOptions, type);

    const fullListContent = matchedFullListDataByType?.value;
    const fullListTitle = matchedFullListDataByType?.title;
    const isFullListArtistsList = matchedFullListDataByType?.isArtistsList;

    return { fullListContent, fullListTitle, isFullListArtistsList };
};