import {findMatchingOptionByKey} from "./findMatchingOptionByKey";
import {AlbumOrArtist} from "../Interfaces/ListItem";
import {FullListPageOption} from "../Interfaces/FullListPageOption";

interface FullListMatchedData {
    fullListContent: AlbumOrArtist[];
    fullListTitle: string;
    isFullListArtistsList: boolean;
}

export const getFullListMatchedData = (fullListPageOptions: FullListPageOption[], type: string): FullListMatchedData => {
    const matchedFullListDataByType = findMatchingOptionByKey(fullListPageOptions, type)!;

    const fullListContent = matchedFullListDataByType?.value;
    const fullListTitle = matchedFullListDataByType?.title;
    const isFullListArtistsList = matchedFullListDataByType?.isArtistsList;

    return {fullListContent, fullListTitle, isFullListArtistsList};
};