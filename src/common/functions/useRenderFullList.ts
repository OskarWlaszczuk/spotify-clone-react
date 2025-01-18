import {useRenderTilesList} from "../hooks/useRenderTilesList";
import {removeDuplicatesByName} from "./removeDuplicatesByName";
import {toAlbum, toArtist} from "./routes";
import {getFullListMatchedData} from "./getFullListMatchedData";
import {FullListPageOption} from "../Interfaces/FullListPageOption";

export const useRenderFullList = () => {
    const renderTilesList = useRenderTilesList();

    const renderFullList = (fullListPageOptions:FullListPageOption[], fullListType:string) => {
        const {
            fullListContent,
            fullListTitle,
            isFullListArtistsList
        } = getFullListMatchedData(fullListPageOptions, fullListType);

        return renderTilesList([
            {
                title: fullListTitle,
                list: removeDuplicatesByName(fullListContent),
                toPageFunction: isFullListArtistsList ? toArtist : toAlbum,
                isArtistsList: isFullListArtistsList,
                showPreviewListPart: false,
                isRenderSubInfo: true,
            },
        ]);
    };

    return renderFullList;
};