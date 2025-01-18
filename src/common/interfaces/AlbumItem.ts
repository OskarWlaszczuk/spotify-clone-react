import { ArtistsList } from "./ArtistsList";
import { BaseMediaItemData } from "./BaseMediaItemData";
import { AlbumGroupName } from "../Types/AlbumGroupName";
import { AlbumTypeName } from "../Types/AlbumTypeName";
import { TrackItem } from "./TrackItem";

export interface AlbumItem extends BaseMediaItemData, ArtistsList {
    album_type: AlbumTypeName;
    album_group: AlbumGroupName;
    release_date: string;
    tracks: {
        items: TrackItem[];
    };
}