import { getArtistReleasesEndpointResource } from "../../../common/functions/getArtistReleasesEndpointResource";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../artistDetailsPage/slices/artistAlbumsSlice";
import { artistsActions, artistsSelectors } from "../../homePage/slices/artistsSlice";

export const useDependentApiFetch = ({ mainArtistId, artistsIdsList, fetchCondition }) => {

    const {
        configs: mainArtistAllReleasesDataConfig,
        apiStatus: mainArtistAllReleasesDataStatus,
        rawApiData: mainArtistAllReleasesData
    } = useApiResource({
        actions: artistAlbumsActions,
        selectors: artistAlbumsSelectors,
        endpoint: `artists/${mainArtistId}/${getArtistReleasesEndpointResource()}`,
    });

    const {
        configs: artistsDetailsListConfig,
        apiStatus: artistsDetailsListStatus,
        rawApiData: artistsDetailsList
    } = useApiResource({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: `artists?ids=${artistsIdsList}`,
    });

    const dependentConfigs = [mainArtistAllReleasesDataConfig, artistsDetailsListConfig];
    const dependentStatuses = [mainArtistAllReleasesDataStatus, artistsDetailsListStatus];
    const dependentApiData = [mainArtistAllReleasesData, artistsDetailsList];

    useFetchAPI({
        fetchConfigs: dependentConfigs,
        dependencies: [mainArtistId],
        fetchCondition,
    });

    return { dependentStatuses, dependentApiData };
};