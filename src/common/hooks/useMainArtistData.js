import { artistDetailsActions, artistDetailsSelectors } from "../slices/artistDetailsSlice";
import { useApiResource } from "./useApiResource";
import { useFetchAPI } from "./useFetchAPI";
import { artistAlbumsActions, artistAlbumsSelectors } from "../slices/artistAlbumsSlice";
import { getArtistDetailsEndpoint, getArtistReleasesEndpoint } from "../functions/endpoints";

export const useMainArtistData = ({ mainArtistId, dependencies = [], includeAppearsOnReleases = true }) => {

    const apiDependencies = [mainArtistId, ...dependencies]

    const {
        configs: mainArtistDetailsConfig,
        rawApiData: mainArtistDetails,
        apiStatus: mainArtistDetailsStatus
    } = useApiResource({
        actions: artistDetailsActions,
        selectors: artistDetailsSelectors,
        endpoint: getArtistDetailsEndpoint({id:mainArtistId})
    });

    const {
        configs: mainArtistReleasesConfig,
        rawApiData: mainArtistReleases,
        apiStatus: mainArtistReleasesStatus
    } = useApiResource({
        actions: artistAlbumsActions,
        selectors: artistAlbumsSelectors,
        endpoint: getArtistReleasesEndpoint({ id: mainArtistId, includeAppearsOnReleases })
    });

    useFetchAPI({
        fetchConfigs: [mainArtistDetailsConfig, mainArtistReleasesConfig],
        pageId: mainArtistId,
        dependencies: apiDependencies,
        fetchCondition: !!mainArtistId
    });

    const mainArtistDataStatuses = [mainArtistDetailsStatus, mainArtistReleasesStatus];

    return { mainArtistDetails, mainArtistReleases, mainArtistDataStatuses };
};