import { PopularListTitle } from "../types/PopularListTitle";
import { PopularListFullListType } from "../types/PopularListFullListType";
import { AlbumOrArtist } from "../../../common/Interfaces/AlbumOrArtist";
import { EpisodeItem } from "../../../common/Interfaces/EpisodeItem";

export interface PopularListConfig {
    title: PopularListTitle;
    list: AlbumOrArtist[] | EpisodeItem[];
    fullListType: PopularListFullListType;
    isArtistsList: boolean;
}