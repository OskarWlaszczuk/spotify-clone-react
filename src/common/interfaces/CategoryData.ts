import { CategoryName } from "../Types/CategoryName";
import { AlbumOrArtist } from "./AlbumOrArtist";
import { EpisodeItem } from "./EpisodeItem";

export interface CategoryData {
    categoryName: CategoryName;
    categoryView: AlbumOrArtist[] | EpisodeItem[];
};