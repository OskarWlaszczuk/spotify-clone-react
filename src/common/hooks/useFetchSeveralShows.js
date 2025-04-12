import { getSeveralShowsListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { showsActions, showsSelectors } from "../slices/showsSlice";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchSeveralShows = ({ IDs, fetchCondition = true }) => {
    const formattedIDs = formatIdsForFetch(IDs);

    const { APIFetchStatus, APIData } = useFetchAPI({
        actions: showsActions,
        selectors: showsSelectors,
        endpoint: getSeveralShowsListEndpoint({ id: formattedIDs }),
        fetchCondition
    });

    const shows = {
        list: APIData?.shows,
        status: APIFetchStatus
    };

    return shows;
};