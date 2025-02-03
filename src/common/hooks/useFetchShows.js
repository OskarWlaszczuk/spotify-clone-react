import { getSeveralShowsListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { showsActions, showsSelectors } from "../slices/showsSlice";
import { useFetch } from "./useFetchAPI";

export const useFetchShows = ({ IDs, fetchCondition = true }) => {
    const formattedIDs = formatIdsForFetch(IDs);

    const { APIFetchStatus: showsStatus, APIData } = useFetch({
        actions: showsActions,
        selectors: showsSelectors,
        endpoint: getSeveralShowsListEndpoint({ id: formattedIDs }),
        fetchCondition
    });

    const shows = APIData?.shows;

    return { shows, showsStatus };
};