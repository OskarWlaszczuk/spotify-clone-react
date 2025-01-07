import { getArtistReleasesEndpoint, getSeveralArtistsListEndpoint } from "../../../common/functions/endpoints";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { useFetchArtistReleases } from "../../../common/hooks/useFetchArtistReleases";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../../common/slices/artistAlbumsSlice";
import { artistsActions, artistsSelectors } from "../../../common/slices/artistsSlice";

export const useDependentApiFetch = ({ mainArtistId, artistsIdsList, fetchCondition }) => {

    const { artistReleasesStatus, artistReleasesData } = useFetchArtistReleases({ artistId: mainArtistId, fetchCondition });

    const {
        configs: artistsDetailsListConfig,
        apiStatus: artistsDetailsListStatus,
        rawApiData: artistsDetailsList
    } = useApiResource({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: getSeveralArtistsListEndpoint({ id: artistsIdsList }),
    });

    const dependentConfigs = [artistsDetailsListConfig];
    const dependentStatuses = [artistReleasesStatus, artistsDetailsListStatus];
    const dependentApiData = [artistReleasesData, artistsDetailsList];
    useFetchAPI({
        fetchConfigs: dependentConfigs,
        dependencies: [mainArtistId],
        fetchCondition,
        pageId: mainArtistId,
    });

    return { dependentStatuses, dependentApiData };
};