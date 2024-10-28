import { ImageData } from "./ImageCollection";

export interface MediaItem extends ImageData {
    id: string;
    name: string;
    release_date: string;
    album_group?: string;
    album_type?: string;
    type?: string;
    artists?: any
};