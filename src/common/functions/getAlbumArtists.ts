import { ArtistData } from "../interfaces/ArtistData";

export const getAlbumArtists = (artists: ArtistData[]): string => artists.map(({ name }) => name).join(",");