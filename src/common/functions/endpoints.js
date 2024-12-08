export const getAlbumDetailsEndpoint = (albumId) => `albums/${albumId}`;
export const getSeveralAlbumsListEndpoint = (albumsId) => `albums?ids=${albumsId}`;

export const getArtistDetailsEndpoint = (artistId) => `artists/${artistId}`;
export const getSeveralArtistsListEndpoint = (artistsId) => `artists?ids=${artistsId}`;

export const getArtistTopTracksEndpoint = (artistId) => `artists/${artistId}/top-tracks`;

export const getArtistReleasesEndpoint = ({ artistId, isAppearOnReleasesInclude = false }) => {
    const baseEndpoint = `artists/${artistId}/albums?include_groups=album%2Csingle%2Ccompilation&limit=50`;
    const withAppearsOn = `artists/${artistId}/albums?include_groups=album%2Csingle%2Cappears_on%2Ccompilation&limit=50`;

    return isAppearOnReleasesInclude ? withAppearsOn : baseEndpoint;
};

export const getTrackDetailsEndpoint = (trackId) => `tracks/${trackId}`;
