import { useEffect } from "react";
import { CategoriesSwitchersSection } from "../../../common/components/CategoriesSwitchersSection";
import { CategoryConfig } from "../../../common/components/CategoriesSwitchersSection/CategoryConfig";
import { fullListLinkText } from "../../../common/constants/fullListLinkText ";
import { findMatchingOptionByKey } from "../../../common/functions/findMatchingOptionByKey";
import { toAlbum, toHome } from "../../../common/functions/routes";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { EpisodeItem } from "../../../common/Interfaces/EpisodeItem";
import { useCurrentCategoryData } from "../../artistDetailsPage/hooks/useCurrentCategoryData";
import { facetAllCategory, facetMusicCategory, facetPodcastsCategory } from "../constants/facetCategories";
import { allFacetParam, musicFacetParam, podcastsFacetParam } from "../constants/facetParams";
import { useParams } from "react-router-dom";

export const useRenderFacet = (popularAlbums: AlbumItem[], popularEpisodes: EpisodeItem[]) => {

    const { facetType } = useParams();

    const facetCategoriesConfig: CategoryConfig[] = [
        {
            categoryView: popularAlbums,
            categoryName: facetAllCategory,
            categorySwitcherContent: "All"
        },
        {
            categoryView: popularAlbums,
            categoryName: facetMusicCategory,
            categorySwitcherContent: "Music"
        },
        {
            categoryView: popularEpisodes,
            categoryName: facetPodcastsCategory,
            categorySwitcherContent: "Podcasts"
        },
    ];


    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({
        ...facetCategoriesConfig[1]
    });
    const renderTilesList = useRenderTilesList();

    const facetParamsGroupedByCategories = [
        { key: facetAllCategory, value: allFacetParam },
        { key: facetMusicCategory, value: musicFacetParam },
        { key: facetPodcastsCategory, value: podcastsFacetParam },
    ];


    const renderFacet = () => {
        return renderTilesList([{
            title: (
                <CategoriesSwitchersSection
                    categoriesConfigs={facetCategoriesConfig}
                    setCurrentCategoryData={setCurrentCategoryData}
                    currentCategory={currentCategoryData.categoryName}
                // link={
                //     toHome({
                //         facetType: findMatchingOptionByKey(
                //             facetParamsGroupedByCategories,
                //             currentCategoryData.categoryName
                //         )?.value
                //     })
                // }
                />
            ),
            list: currentCategoryData.categoryView,
            toPageFunction: toAlbum,
            areHorizontatItems: true,
        }]);
    };

    return renderFacet;
};