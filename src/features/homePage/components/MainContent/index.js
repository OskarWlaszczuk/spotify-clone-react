import { useParams } from "react-router-dom"
import { toHome, toArtist, toAlbum } from "../../../../common/functions/routes";
import { getFullListMatchedData } from "../../../../common/functions/getFullListMatchedData";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { popularAlbumsParam, popularArtistsParam } from "../../../../common/constants/params";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";

export const MainContent = ({ popularArtists, popularAlbums }) => {
    const { type = "" } = useParams();

    const renderTilesList = useRenderTilesList();

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
                renderTilesList(
                    type ?
                        [
                            {
                                title: fullListTitle || undefined,
                                list: fullListContent || undefined,
                                toPageFunction: isFullListArtistsList ? toArtist : toAlbum,
                                isArtistsList: isFullListArtistsList,
                                isHideRestListPart: false,
                                listId: 0,
                            },
                        ] :
                        [
                            {
                                title: popularAlbumsTitle,
                                list: popularAlbums,
                                toPageFunction: toAlbum,
                                fullListData: {
                                    pathname: toHome({ additionalPath: popularAlbumsParam }),
                                    text: fullListLinkText,
                                },
                                listId: 1,
                            },
                            {
                                title: popularArtistsTitle,
                                list: popularArtists,
                                toPageFunction: toArtist,
                                fullListData: {
                                    pathname: toHome({ additionalPath: popularArtistsParam }),
                                    text: fullListLinkText
                                },
                                isArtistsList: true,
                                listId: 2,
                            },
                        ]
                )

            }
        </>
    )
};