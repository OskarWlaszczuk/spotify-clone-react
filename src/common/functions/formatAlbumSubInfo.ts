import { newestItemReleaseDate } from "../../features/artistDetailsPage/constants/newestItemReleaseDate";
import { AlbumItem } from "../Interfaces/AlbumItem";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { getYear } from "./getYear";

export const formatAlbumSubInfo = (albumReleaseDate: AlbumItem["release_date"], albumType: AlbumItem["album_type"]) => (
    `${albumReleaseDate === newestItemReleaseDate ? albumReleaseDate : getYear(albumReleaseDate)} • ${capitalizeFirstLetter(albumType)}`
);