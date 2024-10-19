import { ImageData } from "./ImageCollection";

export interface ReleaseItem {
    release_date: string;
};

interface AlbumData extends ReleaseItem, ImageData { };

interface ArtistList {
    name: string;
};

export interface TrackListItem {
    name: string;
    duration_ms: number;
    artists: ArtistList[];
    album: AlbumData,
};