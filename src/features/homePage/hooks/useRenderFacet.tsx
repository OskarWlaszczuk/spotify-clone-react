import { CategoriesSwitchersSection } from "../../../common/components/CategoriesSwitchersSection";
import { CategoryConfig } from "../../../common/components/CategoriesSwitchersSection/CategoryConfig";
import { toAlbum } from "../../../common/functions/routes";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import { AlbumItem, ArtistItem } from "../../../common/Interfaces/ListItem";
import { useCurrentCategoryData } from "../../artistDetailsPage/hooks/useCurrentCategoryData";
import { allFacetCategory, musicFacetCategory } from "../constants/facetCategories";

export const useRenderFacet = (popularArtists: ArtistItem[], popularAlbums: AlbumItem[]) => {

    const partOfPopularAlbums = popularAlbums?.slice(0, 4);

    const mixedPopularList = [ ...partOfPopularAlbums];


    const facetCategoriesConfig: CategoryConfig[] = [
        {
            categoryView: mixedPopularList,
            categoryName: allFacetCategory,
            categorySwitcherContent: "All"
        },
        {
            categoryView: popularAlbums,
            categoryName: musicFacetCategory,
            categorySwitcherContent: "Music"
        },
    ];

    const renderTilesList = useRenderTilesList();

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({
        categoryName: allFacetCategory,
        categoryView: mixedPopularList,
    });

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
            toPageFunction: toAlbum,
            areHorizontatItems:true,
        }]);
    };

    return renderFacet;
};