interface Album {
    release_date: string
};

export const isLatestReleased = (album: Album): boolean => new Date(album?.release_date).getFullYear() === new Date().getFullYear();