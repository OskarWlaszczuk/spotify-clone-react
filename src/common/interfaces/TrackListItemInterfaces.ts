import { Image } from "./Image";

interface AlbumImage {
    images: Image[];
};

interface ArtistList {
    name: string;
};

export interface TrackListItem {
    name: string;
    duration_ms: number;
    artists: ArtistList[];
    album: AlbumImage,
};