import { Tile } from "../components/Tile"
import { TilesList } from "../components/TilesList"
import { useActiveTile } from "../hooks/useActiveTile";
import { getImage } from "./getImage";
import { renderTileSubInfo } from "./renderTileSubInfo";

export const useRenderTilesList = () => {

    const { setActiveTile, isTileActive } = useActiveTile();

    const renderTilesList = (tilesListDatasList) => {
        return (
            <>
                {
                    tilesListDatasList.map(({
                        title,
                        subExtraContent,
                        list,
                        toPageFunction,
                        fullListData,
                        isHideRestListPart = true,
                        isArtistsList = false,
                        isRenderSubInfo = false,
                    }) => {
                        const pathname = fullListData?.pathname;
                        const text = fullListData?.text;

                        return (
                            < TilesList
                                title={title}
                                subExtraContent={subExtraContent}
                                list={list}
                                renderItem={({
                                    images,
                                    name,
                                    id,
                                    album_type = "",
                                    type = "",
                                    release_date,
                                }, index) => (
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
                                        key={index}
                                        toPage={toPageFunction({ id })}
                                        picture={getImage(images)}
                                        title={name}
                                        subInfo={
                                            isRenderSubInfo
                                                ? renderTileSubInfo({
                                                    isArtistsListCondition: isArtistsList,
                                                    artistType: type,
                                                    albumType: album_type,
                                                    albumReleaseDate: release_date,
                                                })
                                                : isArtistsList
                                                    ? type
                                                    : album_type
                                        }
                                        isArtistPictureStyle={isArtistsList}
                                    />
                                )}
                                hideRestListPart={isHideRestListPart}
                                fullListData={{ pathname, text, }}
                            />
                        )
                    })

                }
            </>
        )
    }

    return renderTilesList;
};