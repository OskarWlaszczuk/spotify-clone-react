import { getArtistReleasesEndpoint } from "../functions/endpoints";
import { artistAlbumsActions, artistAlbumsSelectors } from "../slices/artistAlbumsSlice";
import { useApiResource } from "./useApiResource";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchArtistReleases = ({ artistId, pageId,fetchCondition = true, includeAppearsOnReleases = false }) => {
    const {
        configs: artistReleasesConfig,
        apiStatus: artistReleasesStatus,
        rawApiData: artistReleasesData
    } = useApiResource({
        actions: artistAlbumsActions,
        selectors: artistAlbumsSelectors,
        endpoint: getArtistReleasesEndpoint({ id: artistId, includeAppearsOnReleases }),
    });

    useFetchAPI({
        fetchConfigs: artistReleasesConfig,
        dependencies: [artistId],
        fetchCondition,
        pageId,
    });

    return { artistReleasesStatus, artistReleasesData };
};