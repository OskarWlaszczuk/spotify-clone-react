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

    const { popularListsStatuses, popularLists } = useFetchPopularLists(facetType);
    const newReleases = useFetchNewReleases(facetType);

    const isMusicCategoryActive = facetType === facetMusicCategory;
    const isPodcastCategoryActive = facetType === facetPodcastsCategory;

    const mediaSortedByCreatorsParameters = {
        creatorsDetails: isMusicCategoryActive ?
            popularLists?.artists :
            isPodcastCategoryActive ?
                popularLists?.shows :
                [],
        dataName: isMusicCategoryActive ? "album" : "episode",
    };

    const mediaSortedByCreator = useFetchMediaSortedByCreators({ ...mediaSortedByCreatorsParameters, clearDataOnLeave: false });

    const currentSectionFetchStatus = (
        isMusicCategoryActive || isPodcastCategoryActive ?
            mediaSortedByCreator.status :
            newReleases.status
    );

    const fetchStatus = useFetchStatus([...popularListsStatuses, currentSectionFetchStatus]);
    
    return (
        <Main
            useGradient={!fullListType}
            currentFetchStatus={fetchStatus}
            content={
                <MainContent
                    popularLists={popularLists}
                    mediaSortedByCreator={mediaSortedByCreator.data}
                    newReleases={newReleases.list}
                />
            }
        />
    );
};