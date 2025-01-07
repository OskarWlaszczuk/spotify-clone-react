import { getArtistReleasesEndpoint } from "../functions/endpoints";
import { artistAlbumsActions, artistAlbumsSelectors } from "../slices/artistAlbumsSlice";
import { useApiResource } from "./useApiResource";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchArtistReleases = ({ artistId, fetchCondition = true }) => {
    const {
        configs: artistReleasesConfig,
        apiStatus: artistReleasesStatus,
        rawApiData: artistReleasesData
    } = useApiResource({
        actions: artistAlbumsActions,
        selectors: artistAlbumsSelectors,
        endpoint: getArtistReleasesEndpoint({ id: artistId }),
    });

    useFetchAPI({
        fetchConfigs: artistReleasesConfig,
        dependencies: [artistId],
        fetchCondition,
        pageId: artistId,
    });

    return { artistReleasesStatus, artistReleasesData };
};