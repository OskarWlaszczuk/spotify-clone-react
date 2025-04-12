import { AlbumItem } from "./AlbumItem";
import { ArtistItem } from "./ArtistItem";
import { EpisodeItem } from "./EpisodeItem";
import { ShowItem } from "./ShowItem";
import { TrackItem } from "./TrackItem";

export interface APIData<APIDataType> {
    data: APIDataType;
}

export type APIArtistData = APIData<ArtistItem>;
export type APIAlbumData = APIData<AlbumItem>;
export type APITrackData = APIData<TrackItem>;
export type APIShowData = APIData<ShowItem>;
export type APIEpisodeData = APIData<EpisodeItem>;  