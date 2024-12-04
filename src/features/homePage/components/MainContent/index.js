import { useParams } from "react-router-dom"
import { toHome, toArtist, toAlbum } from "../../../../common/functions/routes";
import { getFullListMatchedData } from "../../../../common/functions/getFullListMatchedData";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { popularAlbumsParam, popularArtistsParam } from "../../../../common/constants/params";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";
import { useGenerateUniqueListId } from "../../../../common/hooks/useGenerateUniqueListId";

export const MainContent = ({ popularArtists, popularAlbums }) => {
    const { type = "" } = useParams();

    const renderTilesList = useRenderTilesList();
    const updatedPopularArtists = useGenerateUniqueListId(popularArtists);
    const updatedPopularAlbums = useGenerateUniqueListId(popularAlbums);

    const popularAlbumsTitle = "Popular albums";
    const popularArtistsTitle = "Popular artists";

    const fullListsDataOptions = [
        { key: popularAlbumsParam, value: popularAlbums, title: popularAlbumsTitle, isArtistsList: false },
        { key: popularArtistsParam, value: popularArtists, title: popularArtistsTitle, isArtistsList: true },
    ];

    const { fullListContent, fullListTitle, isFullListArtistsList } = getFullListMatchedData(fullListsDataOptions, type);

    return (
        <>
            {
                <>
                    {
                        renderTilesList(
                            type ?
                                [
                                    {
                                        title: fullListTitle || undefined,
                                        list: fullListContent || undefined,
                                        toPageFunction: isFullListArtistsList ? toArtist : toAlbum,
                                        isArtistsList: isFullListArtistsList,
                                        isHideRestListPart: false,
                                    },
                                ] :
                                [
                                    {
                                        title: popularAlbumsTitle,
                                        list: updatedPopularAlbums,
                                        toPageFunction: toAlbum,
                                        fullListData: {
                                            pathname: toHome({ additionalPath: popularAlbumsParam }),
                                            text: fullListLinkText,
                                        },
                                        // listId: random1,
                                    },
                                    {
                                        title: popularArtistsTitle,
                                        list: updatedPopularArtists,
                                        toPageFunction: toArtist,
                                        fullListData: {
                                            pathname: toHome({ additionalPath: popularArtistsParam }),
                                            text: fullListLinkText
                                        },
                                        isArtistsList: true,
                                        // listId: random2,
                                    },
                                ]
                        )
                    }
                </>
            }
        </>
    )
};