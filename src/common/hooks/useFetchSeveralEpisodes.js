import { getSeveralEpisodesListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { episodesActions, episodesSelectors } from "../slices/episodesSlice";
import { useApiResource } from "./useApiResource";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchSeveralEpisodes = ({ episodeIdsList, pageId, fetchCondition = true }) => {
    const formattedEpisodeIdsList = formatIdsForFetch(episodeIdsList);

    const {
        configs: episodeConfig,
        rawApiData: rawEpisodesDetails,
        apiStatus: episodesDetailsStatus
    } = useApiResource({
        actions: episodesActions,
        selectors: episodesSelectors,
        endpoint: getSeveralEpisodesListEndpoint({ id: formattedEpisodeIdsList })
    });

    useFetchAPI({ fetchConfigs: [episodeConfig], fetchCondition, dependencies: [episodeIdsList], pageId });

    const episodesDetailsList = rawEpisodesDetails?.episodes;

    return { episodesDetailsList, episodesDetailsStatus };
}