import { BaseMediaItemData } from "./BaseMediaItemData";

export interface ArtistItem extends BaseMediaItemData {
    followers: {
        total: number;
    };
}