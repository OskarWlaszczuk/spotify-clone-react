import { CategoriesSwitchersSection } from "../../../common/components/CategoriesSwitchersSection";
import { CategoryConfig } from "../../../common/components/CategoriesSwitchersSection/CategoryConfig";
import { toHome } from "../../../common/functions/routes";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import { useCurrentCategoryData } from "../../artistDetailsPage/hooks/useCurrentCategoryData";
import { facetAllCategory, facetMusicCategory, facetPodcastsCategory } from "../constants/facetCategories";
import { mixLists } from "../functions/mixLists";
import { PopularLists } from "../interfaces/PopularLists";

export const useRenderFacet = (popularLists: PopularLists, facetType: string | undefined) => {

    const { episodes, albums, artists, shows } = popularLists;

    const allViewFacetList = mixLists(2, albums, shows, artists, episodes);
    const musicViewList = mixLists(4, albums, artists);

    const facetCategoriesConfig: CategoryConfig[] = [
        {
            pathname: toHome({ facetType: facetAllCategory }),
            categoryView: allViewFacetList,
            categoryName: facetAllCategory,
            categorySwitcherContent: "All"
        },
        {
            pathname: toHome({ facetType: facetMusicCategory }),
            categoryView: musicViewList,
            categoryName: facetMusicCategory,
            categorySwitcherContent: "Music"
        },
        {
            pathname: toHome({ facetType: facetPodcastsCategory }),
            categoryView: shows,
            categoryName: facetPodcastsCategory,
            categorySwitcherContent: "Podcasts"
        },
    ];

    const facetIndexBasedOnCurrentType = facetCategoriesConfig.findIndex(({ categoryName }) => categoryName === facetType) || 0;

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
                    currentCategory={currentCategoryData.categoryName}
                />
            ),
            list: currentCategoryData.categoryView,
            areHorizontatItems: true,
        }]);
    };

    return renderFacet;
};