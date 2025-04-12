import { CategoriesSwitchersSection } from "../../../common/components/CategoriesSwitchersSection";
import { toAlbum, toArtist } from "../../../common/functions/routes";
import { useCurrentCategoryData } from "./useCurrentCategoryData";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { fullListLinkText } from "../../../common/constants/fullListLinkText ";
import { useParams } from "react-router-dom";
import { formatAlbumSubInfo } from "../../../common/functions/formatAlbumSubInfo";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";

export const useRenderDiscography = (discographyCaterogiesData: any[]) => {
    const { id: artistId } = useParams();
    const renderTilesList = useRenderTilesList();

    const categoriesConfig = discographyCaterogiesData.map(({ releaseType, switcherButtonContent, releaseList }) => ({ releaseType, switcherButtonContent, releaseList }));
    const initalCategoryData = categoriesConfig[0]
    
    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({
        releaseType: initalCategoryData.releaseType,
        releaseList: initalCategoryData.releaseList,
    });

    const currentReleaseCategory = categoriesConfig.find(({ releaseType }) => releaseType === currentCategoryData.releaseType);

    const renderDiscography = () => {
        return renderTilesList([{
            title: "Discography",
            subTitleExtraContent: (
                <CategoriesSwitchersSection
                    categoriesConfigs={categoriesConfig}
                    setCurrentCategoryData={setCurrentCategoryData}
                    currentCategory={currentCategoryData.releaseType}
                />
            ),
            list: currentCategoryData.releaseList,
            toPageFunction: toAlbum,
            isRenderSubInfo: true,
            fullListData: {
                pathname: toArtist({
                    id: artistId!,
                    fullListType: currentReleaseCategory?.releaseType
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