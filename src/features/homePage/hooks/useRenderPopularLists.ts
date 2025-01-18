import {useRenderTilesList} from "../../../common/hooks/useRenderTilesList";
import {toAlbum, toArtist, toHome} from "../../../common/functions/routes";
import {fullListLinkText} from "../../../common/constants/fullListLinkText ";
import {PopularListConfig} from "../interfaces/PopularListConfig";

export const useRenderPopularLists = () => {
    const renderTilesList = useRenderTilesList();

    const renderPopularLists = (popularListsConfig: PopularListConfig[]) => (
        renderTilesList(
            popularListsConfig.map(({title, list, fullListType, isArtistsList}, index) => ({
                title,
                list,
                toPageFunction: isArtistsList ? toArtist : toAlbum,
                fullListData: {
                    pathname: toHome({fullListType}),
                    text: fullListLinkText,
                },
                listId: index,
                isArtistsList,
            }))
        )
    );

    return renderPopularLists
};