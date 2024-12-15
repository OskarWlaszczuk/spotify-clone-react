import { ImageData } from "./ImageCollection";
import { BasicMediaData } from "./MediaData";

export interface MediaItem extends ImageData, BasicMediaData {
    release_date: string;
    album_group?: string;
    album_type?: string;
    type?: string;
    artists?: any
};