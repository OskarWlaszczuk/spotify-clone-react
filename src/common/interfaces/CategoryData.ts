import { CategoryName } from "../Types/CategoryName";
import { AlbumOrArtist } from "./AlbumOrArtist";
import { EpisodeItem } from "./EpisodeItem";
import { MediaItem } from "./MediaItem";

export interface CategoryData {
    releaseType: CategoryName;
    releaseList: MediaItem[];
};