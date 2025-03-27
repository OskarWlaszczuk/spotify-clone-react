import {
    allReleaseParamDiscography,
    albumsParamDiscography,
    compilationParamDiscography,
    singleParamDiscography
} from "../../../common/constants/artistDiscographyParams";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import {
    popularReleasesCategory,
    albumsCategory,
    compilationsCategory,
    singlesCategory
} from "../constants/releasesCategories";
import { CategoriesSwitchersSection } from "../../../common/components/CategoriesSwitchersSection";
import { removeDuplicatesByName } from "../../../common/functions/removeDuplicatesByName";
import { toAlbum, toArtist } from "../../../common/functions/routes";
import { useCurrentCategoryData } from "./useCurrentCategoryData";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { findMatchingOptionByKey } from "../../../common/functions/findMatchingOptionByKey";
import { fullListLinkText } from "../../../common/constants/fullListLinkText ";
import { useParams } from "react-router-dom";
import { CategoryConfig } from "../../../common/components/CategoriesSwitchersSection/CategoryConfig";
import { formatAlbumSubInfo } from "../../../common/functions/formatAlbumSubInfo";
import { groupReleases } from "../../../common/functions/groupReleases";

export const useRenderDiscography = (releases: AlbumItem[], popularReleases: AlbumItem[]) => {
    const { id: artistId } = useParams();
    const renderTilesList = useRenderTilesList();

    const discographyReleases = groupReleases(releases, ["album", "compilation", "single"]);

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({
        categoryName: popularReleasesCategory,
        categoryView: popularReleases,
    });

    const renderDiscography = () => {
        const categoriesConfigs: CategoryConfig[] = [
            {
                categoryView: popularReleases,
                categoryName: popularReleasesCategory,
                categorySwitcherContent: "Popular releases"
            },
            {
                categoryView: discographyReleases.album,
                categoryName: albumsCategory,
                categorySwitcherContent: "Albums"
            },
            {
                categoryView: discographyReleases.single,
                categoryName: singlesCategory,
                categorySwitcherContent: "Singles and EPs"
            },
            {
                categoryView: discographyReleases.compilation,
                categoryName: compilationsCategory,
                categorySwitcherContent: "Compilations"
            },
        ];

        const discographyParamsGroupedByCategories = [
            { key: popularReleasesCategory, value: allReleaseParamDiscography },
            { key: albumsCategory, value: albumsParamDiscography },
            { key: compilationsCategory, value: compilationParamDiscography },
            { key: singlesCategory, value: singleParamDiscography },
        ];

        return renderTilesList([{
            title: "Discography",
            subTitleExtraContent: (
                <CategoriesSwitchersSection
                    categoriesConfigs={categoriesConfigs}
                    setCurrentCategoryData={setCurrentCategoryData}
                    currentCategory={currentCategoryData.categoryName}
                />
            ),
            list: removeDuplicatesByName(currentCategoryData.categoryView),
            toPageFunction: toAlbum,
            isRenderSubInfo: true,
            fullListData: {
                pathname: toArtist({
                    id: artistId!,
                    fullListType: findMatchingOptionByKey(
                        discographyParamsGroupedByCategories,
                        currentCategoryData.categoryName
                    )?.value,
                }),
                text: fullListLinkText,
            },
            renderSubInfo: (
                { release_date, album_type }:
                    { release_date: AlbumItem["release_date"], album_type: AlbumItem["album_type"] }
            ) => formatAlbumSubInfo(release_date, album_type),
        }]);
    };

    return renderDiscography
};