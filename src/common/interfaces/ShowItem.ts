import { BaseMediaItemData } from "./BaseMediaItemData";

export interface ShowItem extends BaseMediaItemData {
    publisher: string;
    description?: string;
}