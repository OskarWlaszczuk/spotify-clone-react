import { DataByGroup } from "../interfaces/DataByGroup";
import { MediaItem } from "../interfaces/MediaItem";
import { findMatchingValueByKey } from "./findMatchingValueByKey";

interface MatchFullListDataByTypeReturnValues {
    fullListTitle: string | undefined;
    fullListContent: any;
    isFullListArtistsList: boolean | undefined;
};

export const matchFullListDataByType = (fullListsDatasOptions: DataByGroup<MediaItem[] | undefined>[], type: string): MatchFullListDataByTypeReturnValues => {

    const matchedFullListDataByType = findMatchingValueByKey(fullListsDatasOptions, type);

    const fullListContent = matchedFullListDataByType?.value;
    const fullListTitle = matchedFullListDataByType?.title;
    const isFullListArtistsList = matchedFullListDataByType?.isArtistsList;

    return { fullListContent, fullListTitle, isFullListArtistsList };
};