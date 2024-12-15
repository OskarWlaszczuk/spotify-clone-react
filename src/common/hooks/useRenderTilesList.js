import { Tile } from "../components/Tile"
import { TilesList } from "../components/TilesList"
import { useActiveTile } from "./useActiveTile";
import { getFirstImage } from "../functions/getFirstImage";
import { getYear } from "../functions/getYear";
import { newestItemReleaseDate } from "../../features/artistDetailsPage/constants/newestItemReleaseDate";

const renderTileSubInfo = ({
    isArtistsListCondition,
    artistType,
    albumType,
    albumReleaseDate
}) => (
    isArtistsListCondition ?
        `${artistType}` :
        `${albumType} • ${albumReleaseDate === newestItemReleaseDate ? albumReleaseDate : getYear(albumReleaseDate)}`
);

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
                                               hideRestListPart = true,
                        isArtistsList = false,
                        isRenderSubInfo = false,
                    }) => {
                        const pathname = fullListData?.pathname;
                        const text = fullListData?.text;


                        return (
                            < TilesList
                                key={listId}
                                title={title}
                                subExtraContent={subExtraContent}
                                list={list}
                                renderItemFunction={({
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
                                        picture={getFirstImage(images)}
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
                                hideRestListPart={hideRestListPart}
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