import { getSeveralEpisodesListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { episodesActions, episodesSelectors } from "../slices/episodesSlice";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchSeveralEpisodes = ({ IDs, fetchCondition = true }) => {
    const formattedIDs = formatIdsForFetch(IDs);

    const { APIFetchStatus, APIData } = useFetchAPI({
        actions: episodesActions,
        selectors: episodesSelectors,
        endpoint: getSeveralEpisodesListEndpoint({ id: formattedIDs }),
        fetchCondition
    });

    const episodes = {
        list: APIData?.episodes,
        status: APIFetchStatus,
    };

    return episodes;
};