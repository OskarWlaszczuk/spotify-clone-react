import { geteSeveralEpisodesListEndpoint, getSeveralAlbumsListEndpoint, getSeveralArtistsListEndpoint } from "../../../common/functions/endpoints";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { albumsActions, albumsSelectors } from "../../../common/slices/albumsSlice";
import { artistsActions, artistsSelectors } from "../../../common/slices/artistsSlice";
import { episodesActions, episodesSelectors } from "../../../common/slices/episodesSlice";
import { popularAlbumsIdsList, popularArtistsIdsList, popularEpisodesIdsList } from "../constants/popularListsIds";

export const usePopularLists = () => {
    const formatIdsForFetch = (idsList: readonly string[]) => idsList.join(",");

    const formattedPopularAlbumsIdsList = formatIdsForFetch(popularAlbumsIdsList);
    const formattedPopularArtistsIdsList = formatIdsForFetch(popularArtistsIdsList);
    const formattedPopularEpisodesIdsList = formatIdsForFetch(popularEpisodesIdsList);

    const {
        configs: popularArtistsConfig,
        apiStatus: popularArtistsStatus,
        rawApiData: rawPopularArtistsList
    } = useApiResource({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: getSeveralArtistsListEndpoint({ id: formattedPopularArtistsIdsList }),
    });

    const {
        configs: popularAlbumsConfig,
        apiStatus: popularAlbumsStatus,
        rawApiData: rawPopularAlbumsList
    } = useApiResource({
        actions: albumsActions,
        selectors: albumsSelectors,
        endpoint: getSeveralAlbumsListEndpoint({ id: formattedPopularAlbumsIdsList }),
    });

    const {
        configs: popularEpisodesConfig,
        apiStatus: popularEpisodesStatus,
        rawApiData: rawPopularEpisodesList,
    } = useApiResource({
        actions: episodesActions,
        selectors: episodesSelectors,
        endpoint: geteSeveralEpisodesListEndpoint({ id: formattedPopularEpisodesIdsList }),
    });

    const configs = [popularAlbumsConfig, popularArtistsConfig, popularEpisodesConfig];
    const apiStatuses = [popularAlbumsStatus, popularArtistsStatus, popularEpisodesStatus];
    const apiDataList = [rawPopularAlbumsList, rawPopularArtistsList, rawPopularEpisodesList]

    return { configs, apiStatuses, apiDataList };
};