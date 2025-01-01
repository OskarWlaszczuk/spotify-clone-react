import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useParams } from "react-router-dom";
import { usePopularLists } from "../../hooks/usePopularLists";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { useArtistsAlbumsList } from "../../../trackDetailsPage/hooks/useArtistsAlbumsList";
import { useArtistsDetails } from "../../../../common/hooks/useArtistsDetails";

export const HomePage = () => {
    const { fullListType, facetType } = useParams();
    const homeId = "home"

    const { configs, apiStatuses, apiDataList } = usePopularLists();

    const [
        { albums: popularAlbumsList },
        { artists: popularArtistsList },
        { episodes: popularEpisodesList }
    ] = getSpecificKeys(apiDataList, ["albums", "artists", "episodes"]);

    const formatPopularListForFetch = (idsList) => idsList.join(",");
    const popularArtistsIdsList = [
        "4iHNK0tOyZPYnBU7nGAgpQ",
        "5lpH0xAS4fVfLkACg9DAuM",
        "5WUlDfRSoLAfcVSX1WnrxN",
        "66CXWjxzNUsdJxJ2JdwvnR",
        "0TMvoNR0AIJV138mHY6jdE",
        "0MIG6gMcQTSvFbKvUwK0id",
        "1GxkXlMwML1oSg5eLPiAz3",
        "38EmEgXkgK51MT2tPY0EoC",
    ];

    const {
        artistsDetailsListConfig,
        artistsDetailsListStatus,
        artistsDetailsList
    } = useArtistsDetails({
        artistsIds: formatPopularListForFetch(popularArtistsIdsList),
        pageId: homeId,
        fetchCondition: !!popularArtistsIdsList,
    });

    const {
        artistsAllReleasesDataList,
        artistsAllReleasesDataListStatus
    } = useArtistsAlbumsList({
        artistsIdsList: popularArtistsIdsList,
        artistsDetailsList: artistsDetailsList?.artists,
    });

    const fetchStatus = useFetchStatus([...apiStatuses, artistsDetailsListStatus, artistsAllReleasesDataListStatus]);

    useFetchAPI({ fetchConfigs: [...configs, artistsDetailsListConfig], pageId: homeId });

console.log(artistsAllReleasesDataList)
    return (
        <Main
            useGradient={!fullListType}
            currentFetchStatus={fetchStatus}
            content={
                <MainContent
                    popularArtists={popularArtistsList}
                    popularAlbums={popularAlbumsList}
                    popularEpisodes={popularEpisodesList}
                    artistsAllReleasesDataList={artistsAllReleasesDataList}
                />
            }
        />
    );
};