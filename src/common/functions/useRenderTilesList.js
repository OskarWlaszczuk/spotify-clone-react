import { Tile } from "../components/Tile"
import { TilesList } from "../components/TilesList"
import { useActiveTile } from "../hooks/useActiveTile";
import { getImage } from "./getImage";
import { getYear } from "./getYear";

const renderTileSubInfo = ({
    isArtistsListCondition,
    artistType,
    albumType,
    albumReleaseDate
}) => isArtistsListCondition ? `${artistType}` : `${albumType} • ${getYear(albumReleaseDate)}`;

export const useRenderTilesList = () => {
    const { setActiveTile, isTileActive } = useActiveTile();
    const renderTilesList = (tilesListDataList) => {

        return (
            <>
                {
                    tilesListDataList.map(({
                        title,
                        subExtraContent,
                        list,
                        toPageFunction,
                        fullListData,
                        listId,
                        isuseHideRestListPart = true,
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
                                        isActive={isTileActive(index, listId)}
                                        mouseEventHandlers={{
                                            enter: () => setActiveTile({
                                                activeTileIndex: index,
                                                activeTilesListID: listId,
                                            }),
                                            leave: () => setActiveTile({
                                                activeTileIndex: undefined,
                                                activeTilesListID: undefined,
                                            }),
                                        }}
                                        key={index}
                                        toPagePath={toPageFunction({ id })}
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
                                useHideRestListPart={isuseHideRestListPart}
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