import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";
import { useParams } from "react-router-dom";
import { usePopularLists } from "../../hooks/useFetchPopularLists";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { useArtistsAlbumsList } from "../../../trackDetailsPage/hooks/useArtistsAlbumsList";
import { popularArtistsIdsList } from "../../constants/popularListsIds";

export const HomePage = () => {
    const { fullListType } = useParams();

    const { popularListsStatuses, popularLists } = usePopularLists();

    const [
        { albums: popularAlbumsList },
        { artists: popularArtistsDetailsList },
        { episodes: popularEpisodesList }
    ] = getSpecificKeys(popularLists, ["albums", "artists", "episodes"]);

    const {
        artistsAllReleasesDataList,
        artistsAllReleasesDataListStatus
    } = useArtistsAlbumsList({
        artistsIdsList: popularArtistsIdsList,
        artistsDetailsList: popularArtistsDetailsList,
    });

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