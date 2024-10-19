import { ArtistName } from "./ArtistName";
import { ImageData } from "./ImageCollection";

interface Followers {
    total: number;
};

export interface Details extends ArtistName, ImageData {
    followers: Followers;
};