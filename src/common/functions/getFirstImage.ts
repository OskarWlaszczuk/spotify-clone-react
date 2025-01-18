import { ImageURL } from "../Interfaces/ImageURL";
import { isNotEmpty } from "./isNotEmpty";

//Jeżeli zdjęcie nie istnieje, zwrócić placeholder
export const getFirstImage = (images: ImageURL[]) => isNotEmpty(images) ? images[0].url : "";