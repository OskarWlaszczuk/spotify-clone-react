import { getSeveralArtistsListEndpoint } from "../../../common/functions/endpoints";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { useFetchArtistReleases } from "../../../common/hooks/useFetchArtistReleases";
import { artistsActions, artistsSelectors } from "../../../common/slices/artistsSlice";

export const useDependentApiFetch = ({ pageId, mainArtistId, artistsIdsList, fetchCondition }) => {

    // const { artistReleasesStatus, artistReleasesData } = useFetchArtistReleases({ pageId, artistId: mainArtistId, fetchCondition });

    const {
        configs: artistsDetailsListConfig,
        apiStatus: artistsDetailsListStatus,
        rawApiData: artistsDetailsList
    } = useApiResource({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: getSeveralArtistsListEndpoint({ id: artistsIdsList }),
    });
    // console.log(artistsDetailsListConfig)
    // const dependentConfigs = [artistsDetailsListConfig];
    // const dependentStatuses = [artistReleasesStatus, artistsDetailsListStatus];
    // const dependentApiData = [artistReleasesData, artistsDetailsList];

    useFetchAPI({
        fetchConfigs: [artistsDetailsListConfig],
        dependencies: [mainArtistId],
        fetchCondition,
        pageId: mainArtistId,
    });

    // return { dependentStatuses, dependentApiData };
};