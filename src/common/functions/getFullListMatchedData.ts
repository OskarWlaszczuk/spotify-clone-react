import {findMatchingOptionByKey} from "./findMatchingOptionByKey";
import {FullListPageOption} from "../Interfaces/FullListPageOption";
import { AlbumOrArtist } from "../Interfaces/AlbumOrArtist";

interface FullListMatchedData {
    fullListContent: AlbumOrArtist[];
    fullListTitle: string;
    isFullListArtistsList: boolean;
}

export const getFullListMatchedData = (fullListPageOptions: FullListPageOption[], fullListType: string): FullListMatchedData => {
    const matchedFullListDataByType = findMatchingOptionByKey(fullListPageOptions, fullListType)!;

    const fullListContent = matchedFullListDataByType?.value;
    const fullListTitle = matchedFullListDataByType?.title;
    const isFullListArtistsList = matchedFullListDataByType?.isArtistsList;

    return {fullListContent, fullListTitle, isFullListArtistsList};
};