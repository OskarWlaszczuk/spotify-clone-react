import { ArtistData } from "../interfaces/ArtistName";

export const getAlbumArtists = (artists: ArtistData[] = [], seperator: string = "•"): string => (
    artists.map(({ name }) => name).join(seperator)
);