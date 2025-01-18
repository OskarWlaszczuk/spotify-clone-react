import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";
import { useParams } from "react-router-dom";
import { usePopularLists } from "../../hooks/useFetchPopularLists";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { useArtistsAlbumsList, useArtistsAlbumsList2 } from "../../../trackDetailsPage/hooks/useArtistsAlbumsList";
import { popularArtistsIdsList, popularShowsIdsList } from "../../constants/popularListsIds";
import { useFetchShows } from "../../../../common/hooks/useFetchShows";

export const HomePage = () => {
    const { fullListType } = useParams();

    const { popularListsStatuses, popularLists } = usePopularLists();
console.log(popularLists)
    const [
        { albums: popularAlbumsList },
        { artists: popularArtistsDetailsList },
        popularEpisodesList
    ] = getSpecificKeys(popularLists, ["albums", "artists", "episodes"]);

    const {
        artistsAllReleasesDataList,
        artistsAllReleasesDataListStatus
    } = useArtistsAlbumsList({
        artistsIdsList: popularArtistsIdsList,
        artistsDetailsList: popularArtistsDetailsList,
    });
// console.log(popularEpisodesList)
    const fetchStatus = useFetchStatus([...popularListsStatuses, artistsAllReleasesDataListStatus]);
    return (
        <Main
            useGradient={!fullListType}
            currentFetchStatus={fetchStatus}
            content={
                <MainContent
                    popularLists={[popularAlbumsList, popularArtistsDetailsList, popularEpisodesList]}
                    artistsAllReleasesDataList={artistsAllReleasesDataList}
                />
            }
        />
    );
};