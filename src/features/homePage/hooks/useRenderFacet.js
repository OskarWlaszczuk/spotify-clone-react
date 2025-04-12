import { CategoriesSwitchersSection } from "../../../common/components/CategoriesSwitchersSection";
import { toHome } from "../../../common/functions/routes";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import { useCurrentCategoryData } from "../../artistDetailsPage/hooks/useCurrentCategoryData";
import { facetAllCategory, facetMusicCategory, facetPodcastsCategory } from "../constants/facetCategories";
import { mixLists } from "../functions/mixLists";

export const useRenderFacet = (popularLists, facetType) => {
    const { episodes, albums, artists, shows } = popularLists;

    const allViewFacetList = mixLists(2, albums, shows, artists, episodes);
    const musicViewList = mixLists(4, albums, artists);

    const facetCategoriesConfig = [
        {
            pathname: toHome({ facetType: facetAllCategory }),
            releaseList: allViewFacetList,
            releaseType: facetAllCategory,
            switcherButtonContent: "All"
        },
        {
            pathname: toHome({ facetType: facetMusicCategory }),
            releaseList: musicViewList,
            releaseType: facetMusicCategory,
            switcherButtonContent: "Music"
        },
        {
            pathname: toHome({ facetType: facetPodcastsCategory }),
            releaseList: shows,
            releaseType: facetPodcastsCategory,
            switcherButtonContent: "Podcasts"
        },
    ];

    const facetIndexBasedOnCurrentType = facetCategoriesConfig.findIndex(({ releaseType }) => releaseType === facetType) || 0;

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({
        ...facetCategoriesConfig[facetIndexBasedOnCurrentType]
    });

    const renderTilesList = useRenderTilesList();

    const renderFacet = () => {
        return renderTilesList([{
            title: (
                <CategoriesSwitchersSection
                    categoriesConfigs={facetCategoriesConfig}
                    setCurrentCategoryData={setCurrentCategoryData}
                    currentCategory={currentCategoryData.releaseType}
                />
            ),
            list: currentCategoryData.releaseList,
            areHorizontatItems: true,
        }]);
    };

    return renderFacet;
};

export const useRenderFacet2 = (popularLists, facetType) => {
    const { episodes, albums, artists, shows } = popularLists;

    const allViewFacetList = mixLists(2, albums, shows, artists, episodes);
    const musicViewList = mixLists(4, albums, artists);

    const facetCategoriesConfig = [
        {
            releaseList: allViewFacetList,
            releaseType: facetAllCategory,
            switcherButtonContent: "All"
        },
        {
            releaseList: musicViewList,
            releaseType: facetMusicCategory,
            switcherButtonContent: "Music"
        },
        {
            releaseList: shows,
            releaseType: facetPodcastsCategory,
            switcherButtonContent: "Podcasts"
        },
    ];

    const facetIndexBasedOnCurrentType = facetCategoriesConfig.findIndex(({ releaseType }) => releaseType === facetType) || 0;

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({
        ...facetCategoriesConfig[facetIndexBasedOnCurrentType]
    });

    const renderTilesList = useRenderTilesList();

    const renderFacet = () => {
        return renderTilesList([{
            title: (
                <CategoriesSwitchersSection
                    categoriesConfigs={facetCategoriesConfig}
                    setCurrentCategoryData={setCurrentCategoryData}
                    currentCategory={currentCategoryData.releaseType}
                />
            ),
            list: currentCategoryData.releaseList,
            areHorizontatItems: true,
        }]);
    };

    return { renderFacet, currentCategoryData };
};