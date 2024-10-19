import { Image } from "./Image";

export interface ReleaseItem {
    release_date: string;
};

interface AlbumData extends ReleaseItem {
    images: Image[];
};

interface ArtistList {
    name: string;
};

export interface TrackListItem {
    name: string;
    duration_ms: number;
    artists: ArtistList[];
    album: AlbumData,
};