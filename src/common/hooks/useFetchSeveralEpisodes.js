import { getSeveralEpisodesListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { episodesActions, episodesSelectors } from "../slices/episodesSlice";
import { useFetch } from "./useFetchAPI";

export const useFetchSeveralEpisodes = ({ IDs, fetchCondition = true }) => {
    const formattedIDs = formatIdsForFetch(IDs);

    const { APIFetchStatus: episodesStatus, APIData } = useFetch({
        actions: episodesActions,
        selectors: episodesSelectors,
        endpoint: getSeveralEpisodesListEndpoint({ id: formattedIDs }),
        fetchCondition
    });

    const episodes = APIData?.episodes;

    return { episodes, episodesStatus };
};