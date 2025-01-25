import { getSeveralArtistsListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { artistsActions, artistsSelectors } from "../slices/artistsSlice";
import { useApiResource } from "./useApiResource";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchSeveralArtists = ({ IDs, fetchCondition = true, dependencies = [], pageID }) => {
    const formattedIDs = formatIdsForFetch(IDs);

    const {
        configs: artistsConfig,
        apiStatus: artistsStatus,
        rawApiData: artists
    } = useApiResource({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: getSeveralArtistsListEndpoint({ id: formattedIDs }),
    });

    useFetchAPI({
        fetchConfigs: [artistsConfig],
        pageId: pageID,
        dependencies,
        fetchCondition,
    });

    return { artists, artistsStatus };
};