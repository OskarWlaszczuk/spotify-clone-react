import { useRenderTilesList } from "../hooks/useRenderTilesList";
import { AlbumItem } from "../Interfaces/AlbumItem";

interface FullListPageCategoriesData {
    releaseList: AlbumItem[];
    releaseType: string;
    listTitle: string;
    isArtistsList: boolean;
}

export const useRenderFullList = (fullListPageCategoriesData: FullListPageCategoriesData[], currentFullListType: string) => {
    const renderTilesList = useRenderTilesList();
    const currentFullListData = fullListPageCategoriesData?.find(({ releaseType }) => releaseType === currentFullListType);

    const renderFullList = () => {

        return renderTilesList([
            {
                title: currentFullListData?.listTitle,
                list: currentFullListData?.releaseList,
                isArtistsList: currentFullListData?.isArtistsList,
                showPreviewListPart: false,
                isRenderSubInfo: true,
            },
        ]);
    };

    return renderFullList;
};