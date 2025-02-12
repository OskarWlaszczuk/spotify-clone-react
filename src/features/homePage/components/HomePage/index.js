import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";
import { useParams } from "react-router-dom";
import { useFetchPopularLists } from "../../hooks/useFetchPopularLists";
import { useFetchMediaSortedByCreators } from "../../../trackDetailsPage/hooks/useFetchMediaSortedByCreators";
import { facetMusicCategory, facetPodcastsCategory } from "../../constants/facetCategories";
import { useFetchNewReleases } from "../../hooks/useFetchNewReleases";

export const HomePage = () => {
    const { facetType, fullListType } = useParams();

    const { popularListsStatuses, popularLists } = useFetchPopularLists();


    const mediaSortedByCreatorsParameters = {
        creatorsDetails: facetType === facetMusicCategory ? popularLists?.artists : facetType === facetPodcastsCategory ? popularLists?.shows : [],
        dataName: facetType === facetMusicCategory ? "album" : "episode",
    };

    const { newReleasesStatus, newReleases } = useFetchNewReleases();
    const {
        mediaSortedByCreator,
        mediaSortedByCreatorStatus
    } = useFetchMediaSortedByCreators(mediaSortedByCreatorsParameters);

    const fetchStatus = useFetchStatus([...popularListsStatuses, newReleasesStatus]);

    console.log(newReleasesStatus, newReleases);
    return (
        <Main
            useGradient={!fullListType}
            currentFetchStatus={fetchStatus}
            content={
                <MainContent
                    popularLists={popularLists}
                    mediaSortedByCreator={mediaSortedByCreator}
                    newReleases={newReleases}
                />
            }
        />
    );
};