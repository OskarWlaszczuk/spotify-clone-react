import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { albumsSelectors } from "../../slices/albumsSlice";
import { toHome, toArtist, toAlbum } from "../../../../common/functions/routes";
import { matchFullListDataByType } from "../../../../common/functions/matchFullListDataByType";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { popularAlbumsParam, popularArtistsParam } from "../../../../common/constants/params";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";

export const MainContent = ({ artistsDetailsList: popularArtists }) => {
    const { type = "" } = useParams();

    const renderTilesList = useRenderTilesList();

    const popularAlbums = useSelector(albumsSelectors.selectDatas)?.datas.albums;

    const popularAlbumsTitle = "Popular albums";
    const popularArtistsTitle = "Popular artists";

    const { fullListContent, fullListTitle, isFullListArtistsList } = matchFullListDataByType([
        { key: popularAlbumsParam, value: popularAlbums, title: popularAlbumsTitle, isArtistsList: false },
        { key: popularArtistsParam, value: popularArtists, title: popularArtistsTitle, isArtistsList: true },
    ], type);

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
                                        list: popularAlbums,
                                        toPageFunction: toAlbum,
                                        fullListData: {
                                            pathname: toHome({ additionalPath: popularAlbumsParam }),
                                            text: fullListLinkText,
                                        },
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
                                    },
                                ]
                        )
                    }
                </>
            }
        </>
    )
};