import { artistTopTracksActions, artistTopTracksSelectors } from "../slices/artistTopTracksSlice";
import { getArtistTopTracksEndpoint } from "../functions/endpoints";
import { useFetchAPI } from "./useFetchAPI";

export const useArtistTopTracks = ({ artistID }) => {

    const { APIFetchStatus, APIData } = useFetchAPI({
        actions: artistTopTracksActions,
        selectors: artistTopTracksSelectors,
        endpoint: getArtistTopTracksEndpoint({ id: artistID }),
        fetchCondition: !!artistID,
        ID: artistID
    });

    const topTracks = APIData?.tracks;
    const topTracksAlbums = topTracks?.map(({ album }) => album);

    const artistTopTracksData = {
        status: APIFetchStatus,
        tracks: topTracks,
        albums: topTracksAlbums,
    };

    return artistTopTracksData;
};