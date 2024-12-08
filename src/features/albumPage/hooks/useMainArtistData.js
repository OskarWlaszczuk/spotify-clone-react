import { artistDetailsActions, artistDetailsSelectors } from "../../artistDetailsPage/slices/artistDetailsSlice";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { getArtistReleasesEndpointResource } from "../../../common/functions/getArtistReleasesEndpointResource";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../artistDetailsPage/slices/artistAlbumsSlice";
import { getArtistDetailsEndpoint, getArtistReleasesEndpoint } from "../../../common/functions/endpoints";

export const useMainArtistData = ({ mainArtistId, dependencies = [], isAppearOnReleasesInclude = true }) => {

    const apiDependencies = [mainArtistId, ...dependencies]

    const {
        configs: mainArtistDetailsConfig,
        rawApiData: mainArtistDetails,
        apiStatus: mainArtistDetailsStatus
    } = useApiResource({
        actions: artistDetailsActions,
        selectors: artistDetailsSelectors,
        endpoint: getArtistDetailsEndpoint(mainArtistId)
    });
    const {
        configs: mainArtistReleasesConfig,
        rawApiData: mainArtistReleases,
        apiStatus: mainArtistReleasesStatus
    } = useApiResource({
        actions: artistAlbumsActions,
        selectors: artistAlbumsSelectors,
        endpoint: getArtistReleasesEndpoint({ artistId: mainArtistId, isAppearOnReleasesInclude })
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