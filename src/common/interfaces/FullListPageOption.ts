import {DiscographyParam} from "../Types/DiscographyParam";
import {PopularListFullListType} from "../../features/homePage/types/PopularListFullListType";
import { AlbumOrArtist } from "./AlbumOrArtist";

export interface FullListPageOption {
    key: DiscographyParam | PopularListFullListType | 'appears-on',
    value: AlbumOrArtist[],
    title: string;
    isArtistsList: boolean;
}