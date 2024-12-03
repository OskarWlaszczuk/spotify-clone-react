import { useDependentFetchAPI } from "./useDependentFetchAPI";
import { useMemoizeEndpointsList } from "./useMemoizeEndpointsList";

export const useArtistTopTracks = ({ artistId, dependencies = [] }) => {

    const memoizedArtistTopTracksEndpoint = useMemoizeEndpointsList(`artists/${artistId}/top-tracks`, [artistId]);

    const {
        depentendApiData: rawArtistTopTracksDataList,
        depentendApiDataStatus: artistTopTracksDataListStatus
    } = useDependentFetchAPI({
        endpointsList: memoizedArtistTopTracksEndpoint,
        fetchCondition: !!artistId,
        dependencies: [...dependencies],
    });

    const artistTopTracksList = rawArtistTopTracksDataList?.[0].tracks;
    const artistTopTracksAsAlbumsList = artistTopTracksList?.map(({ album }) => album);

    return { artistTopTracksDataListStatus, artistTopTracksAsAlbumsList, artistTopTracksList };
};