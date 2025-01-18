import { allReleaseParamDiscography, albumsParamDiscography, compilationParamDiscography, singleParamDiscography } from "../../../common/constants/artistDiscographyParams";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import { popularReleasesCategory, albumsCategory, compilationsCategory, singlesCategory } from "../constants/releasesCategories";
import { CategoriesSwitchersSection } from "../../../common/components/CategoriesSwitchersSection";
import { removeDuplicatesByName } from "../../../common/functions/removeDuplicatesByName";
import { toAlbum, toArtist } from "../../../common/functions/routes";
import { useCurrentCategoryData } from "./useCurrentCategoryData";
import { preparePopularReleases } from "../functions/preparePopularReleases";
import { divideReleases } from "../functions/divideReleases";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { findMatchingOptionByKey } from "../../../common/functions/findMatchingOptionByKey";
import { fullListLinkText } from "../../../common/constants/fullListLinkText ";
import { useParams } from "react-router-dom";
import { CategoryConfig } from "../../../common/components/CategoriesSwitchersSection/CategoryConfig";
import { formatAlbumSubInfo } from "../../../common/functions/formatAlbumSubInfo";

export const useRenderDiscography = (artistAllReleases: AlbumItem[], artistTopTracksAsAlbums: AlbumItem[]) => {
    const { id: artistId } = useParams();
    const renderTilesList = useRenderTilesList();

    const {
        albumsList,
        compilationsList,
        singlesList,
        allReleasesWithoutAppearsOn,
    } = divideReleases(artistAllReleases);

    const uniquePopularReleases = preparePopularReleases(artistTopTracksAsAlbums, allReleasesWithoutAppearsOn);

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({
        categoryName: popularReleasesCategory,
        categoryView: uniquePopularReleases,
    });

    const renderDiscography = () => {
        const categoriesConfigs: CategoryConfig[] = [
            {
                categoryView: uniquePopularReleases,
                categoryName: popularReleasesCategory,
                categorySwitcherContent: "Popular releases"
            },
            {
                categoryView: albumsList,
                categoryName: albumsCategory,
                categorySwitcherContent: "Albums"
            },
            {
                categoryView: singlesList,
                categoryName: singlesCategory,
                categorySwitcherContent: "Singles and EPs"
            },
            {
                categoryView: compilationsList,
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
            renderSubInfo: ({ release_date, album_type }) => formatAlbumSubInfo(release_date, album_type),
        }]);
    };

    return renderDiscography
};