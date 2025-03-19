import { getSeveralArtistsListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { artistsActions, artistsSelectors } from "../slices/artistsSlice";
import { useFetch } from "./useFetchAPI";

export const useFetchSeveralArtists = ({ IDs, fetchCondition = true }) => {
    const formattedIDs = formatIdsForFetch(IDs);

    const { APIFetchStatus: artistsStatus, APIData } = useFetch({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: getSeveralArtistsListEndpoint({ id: formattedIDs }),
        fetchCondition
    });

    const artists = APIData?.artists;

    return { artists, artistsStatus };
};