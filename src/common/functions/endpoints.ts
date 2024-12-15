interface EndpointData {
    id: string;
    isAppearOnReleasesInclude?: boolean;
}

type GetEndpointFunction = ({ id, isAppearOnReleasesInclude }: EndpointData) => string;

export const getAlbumDetailsEndpoint: GetEndpointFunction = ({ id }) => `albums/${id}`;
export const getSeveralAlbumsListEndpoint: GetEndpointFunction = ({ id }) => `albums?ids=${id}`;

export const getArtistDetailsEndpoint: GetEndpointFunction = ({ id }) => `artists/${id}`;
export const getSeveralArtistsListEndpoint: GetEndpointFunction = ({ id }) => `artists?ids=${id}`;

export const getArtistTopTracksEndpoint: GetEndpointFunction = ({ id }) => `artists/${id}/top-tracks`;

export const getArtistReleasesEndpoint: GetEndpointFunction = ({ id, isAppearOnReleasesInclude = false }) => {
    const baseEndpoint = `artists/${id}/albums?include_groups=album%2Csingle%2Ccompilation&limit=50`;
    const withAppearsOn = `artists/${id}/albums?include_groups=album%2Csingle%2Cappears_on%2Ccompilation&limit=50`;

    return isAppearOnReleasesInclude ? withAppearsOn : baseEndpoint;
};

export const getTrackDetailsEndpoint: GetEndpointFunction = ({ id }) => `tracks/${id}`;
