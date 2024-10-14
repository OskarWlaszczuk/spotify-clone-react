interface Artists {
    name: string
};

export const getAlbumArtists = (artists: Artists[]): string => artists.map(({ name }) => name).join(",");