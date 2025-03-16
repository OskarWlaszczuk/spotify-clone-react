import { CategoriesSwitchersSection } from "../../../common/components/CategoriesSwitchersSection";
import { CategoryConfig } from "../../../common/components/CategoriesSwitchersSection/CategoryConfig";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import { useCurrentCategoryData } from "../../artistDetailsPage/hooks/useCurrentCategoryData";

export const useRenderFacet = (facetCategoriesConfig: CategoryConfig[], facetType: string | undefined) => {

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