interface WithName {
    name: string
}

export const getAlbumArtists = <T extends WithName>(
    artistsDetailsList: T[],
    separator: string = "•",
) => (
    artistsDetailsList?.map(({ name }) => name).join(separator)
);