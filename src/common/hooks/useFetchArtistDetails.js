import { getArtistDetailsEndpoint } from "../functions/endpoints";
import { artistDetailsActions, artistDetailsSelectors } from "../slices/artistDetailsSlice";
import { useApiResource } from "./useApiResource";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchArtistDetails = ({ artistId, fetchCondition = true, dependencies = [] }) => {
    const {
        configs: artistDetailsConfig,
        apiStatus: artistDetailsStatus,
        rawApiData: artistDetails
    } = useApiResource({
        actions: artistDetailsActions,
        selectors: artistDetailsSelectors,
        endpoint: getArtistDetailsEndpoint({ id: artistId }),
    });

    useFetchAPI({
        fetchConfigs: [artistDetailsConfig],
        dependencies,
        fetchCondition,
        pageId: artistId,
    });

    return {
        artistDetailsStatus,
        artistDetails,
    };
}