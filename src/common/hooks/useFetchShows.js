import { getSeveralShowsListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { showsActions, showsSelectors } from "../slices/showsSlice";
import { useApiResource } from "./useApiResource";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchShows = ({ showsIdsList, pageId, fetchCondition = true }) => {
    const formattedShowsIdsList = formatIdsForFetch(showsIdsList);

    const {
        configs: showsConfig,
        rawApiData: rawShowsDetails,
        apiStatus: showDetailsStatus
    } = useApiResource({
        actions: showsActions,
        selectors: showsSelectors,
        endpoint: getSeveralShowsListEndpoint({ id: formattedShowsIdsList })
    });

    useFetchAPI({ fetchConfigs: [showsConfig], fetchCondition, dependencies: [showsIdsList], pageId });

    const showsDetailsList = rawShowsDetails?.shows;

    return { showsDetailsList, showDetailsStatus }
};