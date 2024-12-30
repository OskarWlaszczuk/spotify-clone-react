import { getSeveralAlbumsListEndpoint, getSeveralArtistsListEndpoint } from "../../../common/functions/endpoints";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { albumsActions, albumsSelectors } from "../../../common/slices/albumsSlice";
import { artistsActions, artistsSelectors } from "../../../common/slices/artistsSlice";
import { episodesActions, episodesSelectors } from "../../../common/slices/episodesSlice";

export const usePopularLists = () => {
    type IdsList = readonly string[];
    type FormattedIdsList = string;

    const formatPopularListForFetch = (idsList: IdsList) => idsList.join(",");

    const popularAlbumsIdsList: FormattedIdsList = formatPopularListForFetch([
        "47tDANOMCmdRDI5CVcjNKY",
        "7aJuG4TFXa2hmE4z1yxc3n",
        "61ulfFSmmxMhc2wCdmdMkN",
        "4cA2a9w1gSzJEIdbhwUrsH",
        "0zqVGKhttQF25HwPeNcknO",
        "3pbJC94hUZST7m2coeIY6I",
        "02re9DV48w3DBMwnCR6S3Q",
        "4cA2a9w1gSzJEIdbhwUrsH",
    ]);

    const popularArtistsIdsList: FormattedIdsList = formatPopularListForFetch([
        "4iHNK0tOyZPYnBU7nGAgpQ",
        "5lpH0xAS4fVfLkACg9DAuM",
        "5WUlDfRSoLAfcVSX1WnrxN",
        "66CXWjxzNUsdJxJ2JdwvnR",
        "0TMvoNR0AIJV138mHY6jdE",
        "0MIG6gMcQTSvFbKvUwK0id",
        "1GxkXlMwML1oSg5eLPiAz3",
        "38EmEgXkgK51MT2tPY0EoC",
    ]);

    const popularEpisodesIdsList: FormattedIdsList = formatPopularListForFetch([
        "3oTmwclY2QIcCVid8dpDLe",
        "3Kg2Qmr7x6yCLNCUwPd30k",
        "4A7WCiltnjCAT57HhmO7xN",
        "66CXWjxzNUsdJxJ2JdwvnR",
        "0ZyH6ZQIxpfco1fJrq5Dmj",
        "37AxLdZj0ymkjW9Uxs6TLu",
        "2XDdKW7kbpABg3v5FltFri",
    ]);

    const {
        configs: popularArtistsConfig,
        apiStatus: popularArtistsStatus,
        rawApiData: rawPopularArtistsList
    } = useApiResource({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: getSeveralArtistsListEndpoint({ id: popularArtistsIdsList }),
    });

    const {
        configs: popularAlbumsConfig,
        apiStatus: popularAlbumsStatus,
        rawApiData: rawPopularAlbumsList
    } = useApiResource({
        actions: albumsActions,
        selectors: albumsSelectors,
        endpoint: getSeveralAlbumsListEndpoint({ id: popularAlbumsIdsList }),
    });

    const {
        configs: popularEpisodesConfig,
        apiStatus: popularEpisodesStatus,
        rawApiData: rawPopularEpisodesList,
    } = useApiResource({
        actions: episodesActions,
        selectors: episodesSelectors,
        endpoint: getSeveralArtistsListEndpoint({ id: popularEpisodesIdsList }),
    });

    const configs = [popularAlbumsConfig, popularArtistsConfig, popularEpisodesConfig];
    const apiStatuses = [popularAlbumsStatus, popularArtistsStatus, popularEpisodesStatus];
    const apiDataList = [rawPopularAlbumsList, rawPopularArtistsList, rawPopularEpisodesList]

    return { configs, apiStatuses, apiDataList };
};