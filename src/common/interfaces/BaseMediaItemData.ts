import { MediaItemType } from "../Types/MediaItemType";
import { ImageURL } from "./ImageURL";

export interface BaseMediaItemData {
    name: string;
    id: string;
    type: MediaItemType;
    images: ImageURL[];
}