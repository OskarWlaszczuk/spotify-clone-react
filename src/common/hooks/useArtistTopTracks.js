import { useDependentFetchAPI } from "./useDependentFetchAPI";

export const useArtistTopTracks = ({ artistId, dependencies = [] }) => {

    const {
        depentendApiData: rawArtistTopTracksDataList,
        depentendApiDataStatus: artistTopTracksDataListStatus
    } = useDependentFetchAPI({
        endpointsList: [{ endpoint: `artists/${artistId}/top-tracks` }],
        fetchCondition: !!artistId,
        dependencies: [...dependencies],
    });

    const artistTopTracksList = rawArtistTopTracksDataList?.[0].tracks;
    const artistTopTracksAsAlbumsList = artistTopTracksList?.map(({ album }) => album);

    return { artistTopTracksDataListStatus, artistTopTracksAsAlbumsList, artistTopTracksList };
};