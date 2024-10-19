import { ImageData } from "./ImageCollection";
import { ReleaseInfo } from "./ReleaseInfo";

interface AlbumData extends ReleaseInfo, ImageData { };

interface ArtistList {
    name: string;
};

export interface TrackListItem {
    name: string;
    duration_ms: number;
    artists: ArtistList[];
    album: AlbumData,
};