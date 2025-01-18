import { AlbumItem } from "./AlbumItem";
import { ArtistItem } from "./ArtistItem";
import { EpisodeItem } from "./EpisodeItem";
import { ShowItem } from "./ShowItem";
import { TrackItem } from "./TrackItem";

export interface ApiResponse<ApiDataType> {
    data: ApiDataType;
}

export type ApiArtistResponse = ApiResponse<ArtistItem>;
export type ApiAlbumResponse = ApiResponse<AlbumItem>;
export type ApiTrackResponse = ApiResponse<TrackItem>;
export type ApiShowResponse = ApiResponse<ShowItem>;
export type ApiEpisodeResponse = ApiResponse<EpisodeItem>;  