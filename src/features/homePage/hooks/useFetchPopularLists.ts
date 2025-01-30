import { getSeveralEpisodesListEndpoint, getSeveralAlbumsListEndpoint, getSeveralArtistsListEndpoint } from "../../../common/functions/endpoints";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { albumsActions, albumsSelectors } from "../../../common/slices/albumsSlice";
import { artistsActions, artistsSelectors } from "../../../common/slices/artistsSlice";
import { episodesActions, episodesSelectors } from "../../../common/slices/episodesSlice";
import { popularAlbumsIdsList, popularArtistsIdsList, popularEpisodesIdsList, popularShowsIdsList } from "../constants/popularListsIds";
import { formatIdsForFetch } from "../../../common/functions/formatIdsForFetch";
import { useFetchShows } from "../../../common/hooks/useFetchShows";
import { useFetchEpisodes } from "../../../common/hooks/useFetchEpisodes";
import { useFetchSeveralArtists } from "../../../common/hooks/useFetchSeveralArtists";
import { useFetchArtistReleases } from "../../../common/hooks/useFetchArtistReleases";
import { useFetchSeveralAlbums } from "../../../common/hooks/useFetchSeveralAlbums";

export const useFetchPopularLists = () => {
    const homeId = "home"

    const formattedPopularAlbumsIdsList = formatIdsForFetch(popularAlbumsIdsList);
    const formattedPopularArtistsIdsList = formatIdsForFetch(popularArtistsIdsList);
    const formattedPopularEpisodesIdsList = formatIdsForFetch(popularEpisodesIdsList);
    // const formattedPopularShowsIdsList = formatIdsForFetch(popularShowsIdsList);

    // const {
    //     configs: popularArtistsConfig,
    //     apiStatus: popularArtistsStatus,
    //     rawApiData: rawPopularArtistsList
    // } = useApiResource({
    //     actions: artistsActions,
    //     selectors: artistsSelectors,
    //     endpoint: getSeveralArtistsListEndpoint({ id: formattedPopularArtistsIdsList }),
    // });

    // const {
    //     configs: popularAlbumsConfig,
    //     apiStatus: popularAlbumsStatus,
    //     rawApiData: rawPopularAlbumsList
    // } = useApiResource({
    //     actions: albumsActions,
    //     selectors: albumsSelectors,
    //     endpoint: getSeveralAlbumsListEndpoint({ id: formattedPopularAlbumsIdsList }),
    // });

    // const {
    //     configs: popularEpisodesConfig,
    //     apiStatus: popularEpisodesStatus,
    //     rawApiData: rawPopularEpisodesList,
    // } = useApiResource({
    //     actions: episodesActions,
    //     selectors: episodesSelectors,
    //     endpoint: getSeveralEpisodesListEndpoint({ id: formattedPopularEpisodesIdsList }),
    // });

    const {
        albums: popularAlbums,
        albumsStatus: popularAlbumsStatus
    } = useFetchSeveralAlbums({
        IDs: popularAlbumsIdsList,
        pageID: homeId,
    });

    const {
        artists: popularArtists,
        artistsStatus: popularArtistsStatus
    } = useFetchSeveralArtists({
        IDs: popularArtistsIdsList,
        pageID: homeId,
    });

    const {
        episodesDetailsList,
        episodesDetailsStatus
    } = useFetchEpisodes({
        episodeIdsList: popularEpisodesIdsList,
        pageId: homeId,
    });

    console.log(popularAlbums)
    // const popularListsConfig = [popularAlbumsConfig];
    const popularListsStatuses = [popularAlbumsStatus, popularArtistsStatus, episodesDetailsStatus, popularArtistsStatus];
    const popularLists = [popularAlbums, popularArtists, episodesDetailsList];

    // useFetchAPI({ fetchConfigs: [...popularListsConfig], pageId: homeId });

    return { popularListsStatuses, popularLists };
};