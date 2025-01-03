import { getArtistReleasesEndpoint, getSeveralArtistsListEndpoint } from "../../../common/functions/endpoints";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../../common/slices/artistAlbumsSlice";
import { artistsActions, artistsSelectors } from "../../../common/slices/artistsSlice";

export const useDependentApiFetch = ({ mainArtistId, artistsIdsList, fetchCondition }) => {

    const {
        configs: mainArtistAllReleasesDataConfig,
        apiStatus: mainArtistAllReleasesDataStatus,
        rawApiData: mainArtistAllReleasesData
    } = useApiResource({
        actions: artistAlbumsActions,
        selectors: artistAlbumsSelectors,
        endpoint: getArtistReleasesEndpoint({ id: mainArtistId }),
    });

    const {
        configs: artistsDetailsListConfig,
        apiStatus: artistsDetailsListStatus,
        rawApiData: artistsDetailsList
    } = useApiResource({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: getSeveralArtistsListEndpoint({id:artistsIdsList}),
    });

    const dependentConfigs = [mainArtistAllReleasesDataConfig, artistsDetailsListConfig];
    const dependentStatuses = [mainArtistAllReleasesDataStatus, artistsDetailsListStatus];
    const dependentApiData = [mainArtistAllReleasesData, artistsDetailsList];

    useFetchAPI({
        fetchConfigs: dependentConfigs,
        dependencies: [mainArtistId],
        fetchCondition,
        pageId: mainArtistId,
    });

    return { dependentStatuses, dependentApiData };
};