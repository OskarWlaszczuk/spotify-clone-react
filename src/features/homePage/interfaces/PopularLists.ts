import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { ArtistItem } from "../../../common/Interfaces/ArtistItem";
import { EpisodeItem } from "../../../common/Interfaces/EpisodeItem";
import { ShowItem } from "../../../common/Interfaces/ShowItem";

export interface PopularLists {
    artists: ArtistItem[];
    albums: AlbumItem[];
    episodes: EpisodeItem[];
    shows: ShowItem[];
}