import { ArtistData } from "./ArtistName";
import { ImageData } from "./ImageCollection";

interface Followers {
    total: number;
};

export interface Details extends ArtistData, ImageData {
    followers: Followers;
};