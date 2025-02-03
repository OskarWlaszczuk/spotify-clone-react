import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";
import { useParams } from "react-router-dom";
import { useFetchPopularLists } from "../../hooks/useFetchPopularLists";
import { useFetchMediaSortedByCreators } from "../../../trackDetailsPage/hooks/useFetchMediaSortedByCreators";

export const HomePage = () => {
    const { fullListType } = useParams();

    const { popularListsStatuses, popularLists } = useFetchPopularLists();

    const {
        mediaSortedByCreator: releasesSortedByArtists,
        mediaSortedByCreatorStatus: releasesSortedByArtistsStatus
    } = useFetchMediaSortedByCreators({ creatorsDetails: popularLists[0] });

    const fetchStatus = useFetchStatus([...popularListsStatuses, releasesSortedByArtistsStatus]);

    return (
        // <Main
        //     useGradient={!fullListType}
        //     currentFetchStatus={fetchStatus}
        //     content={
        //         <MainContent
        //             popularLists={popularLists}
        //             artistsAllReleasesDataList={artistsReleases}
        //         />
        //     }
        // />
        <></>
    );
};