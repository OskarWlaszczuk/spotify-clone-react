import { useParams } from "react-router-dom"
import { TilesList } from "../../../../common/components/TilesList"
import { useSelector } from "react-redux";
import { Tile } from "../../../../common/components/Tile";
import { albumsSelectors } from "../../slices/albumsSlice";
import { artistsSelectors } from "../../slices/artistsSlice";
import { toHome, toArtist, toAlbum } from "../../../../common/functions/routes";
import { matchFullListDataByType } from "../../../../common/functions/matchFullListDataByType";
import { nanoid } from "nanoid";
import { useActiveTile } from "../../../../common/hooks/useActiveTile";
import { getAlbumArtists } from "../../../../common/functions/getAlbumArtists";
import { MediaItemData } from "../../../../common/interfaces/MediaItemData";

export const MainContent = () => {
    const { type = "" } = useParams<{ type: string }>();

    const popularAlbums = useSelector(albumsSelectors.selectDatas)?.datas.albums;
    const popularArtists = useSelector(artistsSelectors.selectDatas)?.datas.artists;
    const { setActiveTile, isTileActive } = useActiveTile();

    const popularAlbumsParam = "popular-albums";
    const popularArtistsParam = "popular-artists";

    const popularAlbumsTitle = "Popular albums";
    const popularArtistsTitle = "Popular artists";

    const { fullListContent, fullListTitle, isFullListArtistsList } = matchFullListDataByType(
        [
            { key: popularAlbumsParam, value: popularAlbums, title: popularAlbumsTitle, isArtistsList: false },
            { key: popularArtistsParam, value: popularArtists, title: popularArtistsTitle, isArtistsList: true },
        ], type
    );

    return (
        <>
            {
                type ?
                    <TilesList
                        title={fullListTitle || undefined}
                        list={fullListContent || undefined}
                        renderItem={
                            (({ id, name, images, album_type = "" }, index) => (
                                <Tile
                                    isActive={isTileActive(index, 0)}
                                    mouseEventHandlers={{
                                        enter: () => setActiveTile({
                                            activeTileIndex: index,
                                            activeTilesListID: 0,
                                        }),
                                        leave: () => setActiveTile({
                                            activeTileIndex: undefined,
                                            activeTilesListID: undefined,
                                        }),
                                    }}
                                    key={nanoid()}
                                    toPage={toArtist({ id })}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={album_type}
                                    isArtistPictureStyle={isFullListArtistsList}
                                />
                            ))
                        }
                    />
                    :
                    <>
                        <TilesList
                            title={popularAlbumsTitle}
                            list={popularAlbums}
                            renderItem={
                                (({ id, images, name, artists = [] }: MediaItemData, index) => (
                                    <Tile
                                        isActive={isTileActive(index, 1)}
                                        mouseEventHandlers={{
                                            enter: () => setActiveTile({
                                                activeTileIndex: index,
                                                activeTilesListID: 1,
                                            }),
                                            leave: () => setActiveTile({
                                                activeTileIndex: undefined,
                                                activeTilesListID: undefined,
                                            }),
                                        }}
                                        key={nanoid()}
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={getAlbumArtists(artists)}
                                        toPage={toAlbum()}
                                    />
                                )
                                )
                            }
                            hideRestListPart
                            fullListPathname={toHome({ additionalPath: popularAlbumsParam })}
                        />

                        <TilesList
                            title={popularArtistsTitle}
                            list={popularArtists}
                            renderItem={({ images, name, type, id }, index) => (
                                <Tile
                                    isActive={isTileActive(index, 2)}
                                    mouseEventHandlers={{
                                        enter: () => setActiveTile({
                                            activeTileIndex: index,
                                            activeTilesListID: 2,
                                        }),
                                        leave: () => setActiveTile({
                                            activeTileIndex: undefined,
                                            activeTilesListID: undefined,
                                        }),
                                    }}
                                    key={nanoid()}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type || ""}
                                    isArtistPictureStyle
                                    toPage={toArtist({ id })}
                                />
                            )}
                            hideRestListPart
                            fullListPathname={toHome({ additionalPath: popularArtistsParam })}
                        />
                    </>
            }
        </>
    )
}