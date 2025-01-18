import { ArtistsList } from "./ArtistsList";
import { BaseMediaItemData } from "./BaseMediaItemData";

export interface TrackItem extends BaseMediaItemData, ArtistsList {
    disc_number: number;
    duration_ms: number;
}