import { getSeveralArtistsListEndpoint } from "../functions/endpoints";
import { artistsActions, artistsSelectors } from "../slices/artistsSlice";
import { useApiResource } from "./useApiResource";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchSeveralArtistsDetails = ({ artistsIds, fetchCondition = true, dependencies = [] }) => {
    const {
        configs: artistsDetailsListConfig,
        apiStatus: artistsDetailsListStatus,
        rawApiData: artistsDetailsList
    } = useApiResource({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: getSeveralArtistsListEndpoint({ id: artistsIds }),
    });

    useFetchAPI({
        fetchConfigs: [artistsDetailsListConfig],
        dependencies,
        fetchCondition,
        pageId: artistsIds,
    });

    return {
        artistsDetailsListStatus,
        artistsDetailsList,
    };
};