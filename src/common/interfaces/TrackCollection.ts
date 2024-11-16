import { ImageData } from "./ImageCollection";
import { ReleaseInfo } from "./ReleaseInfo";

interface AlbumData extends ReleaseInfo, ImageData { };

interface ArtistList {
    name: string;
    id: string;
};

export interface TrackListItem {
    name: string;
    duration_ms: number;
    artists: ArtistList[];
    album: ImageData;
    disc_number: number;
    id: string;
};