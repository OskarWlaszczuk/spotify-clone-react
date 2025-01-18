interface EndpointData {
    id: string;
    includeAppearsOnReleases?: boolean;
}

type GetEndpointFunction = ({ id, includeAppearsOnReleases }: EndpointData) => string;

export const getAlbumDetailsEndpoint: GetEndpointFunction = ({ id }) => `albums/${id}`;
export const getSeveralAlbumsListEndpoint: GetEndpointFunction = ({ id }) => `albums?ids=${id}`;

export const getArtistDetailsEndpoint: GetEndpointFunction = ({ id }) => `artists/${id}`;
export const getSeveralArtistsListEndpoint: GetEndpointFunction = ({ id }) => `artists?ids=${id}`;

export const getEpisodeDetailsEdnpoint: GetEndpointFunction = ({ id }) => `episodes/${id}`;
export const getSeveralEpisodesListEndpoint: GetEndpointFunction = ({ id }) => `episodes?ids=${id}`;

export const getShowDetailsEndpoint: GetEndpointFunction = ({ id }) => `shows/${id}`;
export const getSeveralShowsListEndpoint: GetEndpointFunction = ({ id }) => `shows?ids=${id}`;
export const getShowEpisodes: GetEndpointFunction = ({ id }) => `shows/${id}/episodes`;

export const getArtistTopTracksEndpoint: GetEndpointFunction = ({ id }) => `artists/${id}/top-tracks`;

export const getArtistReleasesEndpoint: GetEndpointFunction = ({ id, includeAppearsOnReleases = false }) => {
    const baseEndpoint = `artists/${id}/albums?include_groups=album%2Csingle%2Ccompilation&limit=50`;
    const withAppearsOn = `artists/${id}/albums?include_groups=album%2Csingle%2Cappears_on%2Ccompilation&limit=50`;

    return includeAppearsOnReleases ? withAppearsOn : baseEndpoint;
};

export const getTrackDetailsEndpoint: GetEndpointFunction = ({ id }) => `tracks/${id}`;
