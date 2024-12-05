import { artistDetailsActions, artistDetailsSelectors } from "../../artistDetailsPage/slices/artistDetailsSlice";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { getArtistReleasesEndpointResource } from "../../../common/functions/getArtistReleasesEndpointResource";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../artistDetailsPage/slices/artistAlbumsSlice";

export const useMainArtistData = ({ artistsList, albumId }) => {
    const mainArtistId = artistsList?.[0].id;
    const dependencies = [albumId, mainArtistId];

    const {
        configs: mainArtistDetailsConfig,
        rawApiData: mainArtistDetails,
        apiStatus: mainArtistDetailsStatus
    } = useApiResource({
        actions: artistDetailsActions,
        selectors: artistDetailsSelectors,
        endpoint: `artists/${mainArtistId}`
    });
    const {
        configs: mainArtistReleasesConfig,
        rawApiData: mainArtistReleases,
        apiStatus: mainArtistReleasesStatus
    } = useApiResource({
        actions: artistAlbumsActions,
        selectors: artistAlbumsSelectors,
        endpoint: `artists/${mainArtistId}/${getArtistReleasesEndpointResource({ isAppearOnReleasesInclude: true })}`
    });

    useFetchAPI({
        fetchConfigs: [mainArtistDetailsConfig, mainArtistReleasesConfig],
        dependencies,
        fetchCondition: !!mainArtistId
    });

    const mainArtistDataStatuses = [mainArtistDetailsStatus, mainArtistReleasesStatus];

    return { mainArtistDetails, mainArtistReleases, mainArtistDataStatuses };
};