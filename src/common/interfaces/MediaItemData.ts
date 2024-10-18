import { ArtistData } from "./ArtistData";
import { Image } from "./Image";

export interface MediaItemData {
    id: string;
    name: string;
    release_date: string;
    images: Image[],
    album_group?: string;
    album_type?: string;
    type?: string;
    artists?: ArtistData[]
};