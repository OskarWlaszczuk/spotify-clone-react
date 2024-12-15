import { artistTopTracksActions, artistTopTracksSelectors } from "../slices/artistTopTracksSlice";
import { getArtistTopTracksEndpoint } from "../functions/endpoints";
import { useApiResource } from "./useApiResource";
import { useFetchAPI } from "./useFetchAPI";

export const useArtistTopTracks = ({ artistId }) => {

    const {
        configs: artistTopTracksConfig,
        apiStatus: artistTopTracksStatus,
        rawApiData: artistTopTracks
    } = useApiResource({
        actions: artistTopTracksActions,
        selectors: artistTopTracksSelectors,
        endpoint: getArtistTopTracksEndpoint({id:artistId}),
    });

    useFetchAPI({
        fetchConfigs: [artistTopTracksConfig],
        dependencies: [artistId],
        fetchCondition: !!artistId,
        pageId: artistId,
    });

    const artistTopTracksList = artistTopTracks?.tracks;
    const artistTopTracksAsAlbumsList = artistTopTracksList?.map(({ album }) => album);

    return { artistTopTracksStatus, artistTopTracksAsAlbumsList, artistTopTracksList };
};