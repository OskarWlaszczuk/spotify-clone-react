import { ArtistName } from "../interfaces/ArtistName";

export const getAlbumArtists = (artists: ArtistName[]): string => artists.map(({ name }) => name).join(",");