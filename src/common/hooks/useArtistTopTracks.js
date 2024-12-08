import { artistTopTracksActions, artistTopTracksSelectors } from "../../features/artistDetailsPage/slices/artistTopTracksSlice";
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
        endpoint: `artists/${artistId}/top-tracks`,
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