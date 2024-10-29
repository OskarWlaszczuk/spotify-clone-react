import { ImageURL } from "../interfaces/ImageCollection";

export const getFirstImageURL = (images: ImageURL[]): string => images.length > 0 ? images[0].url : "";