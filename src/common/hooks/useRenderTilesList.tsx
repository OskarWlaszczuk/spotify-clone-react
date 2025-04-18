import { Tile } from "../components/Tile"
import { TilesList } from "../components/TilesList"
import { useActiveTile } from "./useActiveTile";
import { getFirstImage } from "../functions/getFirstImage";
import { toAlbum, toArtist, toEpisode, toShow, toTrack } from "../functions/routes";
import { BaseMediaItemData } from "../Interfaces/BaseMediaItemData";

// const renderTileSubInfo = ({
//     isArtistsListCondition,
//     artistType,
//     albumType,
//     albumReleaseDate
// }) => (
//     isArtistsListCondition ?
//         `${artistType}` :
//         `${albumReleaseDate === newestItemReleaseDate ? albumReleaseDate : getYear(albumReleaseDate)} • ${albumType}`
// );

// const getSubInfoList = (list: AlbumItem[]) => (
//     list?.map(({ release_date, album_type }) => (
//         formatAlbumSubInfo(release_date, album_type)
//     ))
// );

const selectPageFunctionBasedOnType = (type: BaseMediaItemData["type"], id: BaseMediaItemData["id"]) => {
    switch (type) {
        case "artist":
            return toArtist({ id });
        case "show":
            return toShow({ id });

        case "album":
            return toAlbum({ id });

        case "episode":
            return toEpisode({ id });

        case "track":
            return toTrack({ id });

        default:
            const _exhaustiveCheck: never = type; // TypeScript zgłosi błąd, jeśli pojawi się nowa wartość
            return _exhaustiveCheck
    };
};

export const useRenderTilesList = () => {
    const { setActiveTile, isTileActive } = useActiveTile();

    const renderTilesList = (tilesListDataList) => {
        return (
            <>
                {
                    tilesListDataList.map(({
                        title,
                        list,
                        toPageFunction,
                        fullListData,
                        listId,
                        titleLink = undefined,
                        extraTitleImage = undefined,
                        subTitleExtraContent = undefined,
                        overTitleExtraContent = undefined,
                        showPreviewListPart = true,
                        isArtistsList = false,
                        isRenderSubInfo = false,
                        areHorizontatItems = false,
                        subInfo = undefined,
                        renderSubInfo = undefined,
                    }) => {
                        const pathname = fullListData?.pathname;
                        const text = fullListData?.text;

                        return (
                            < TilesList
                                titleExtraContent={{
                                    extraTitleImage,
                                    subTitleExtraContent,
                                    overTitleExtraContent,
                                    titleLink,
                                }}
                                areHorizontatItems={areHorizontatItems}
                                key={listId}
                                title={title}
                                list={list}
                                renderItemFunction={(item, index) => {
                                    // const { name, id, images } = item;
                                    const name = item?.name;
                                    const id = item?.id;
                                    const images = item?.images;
                                    const type = item?.type;

                                    const computedSubInfo = (
                                        renderSubInfo ?
                                            renderSubInfo(item) :
                                            subInfo
                                    );

                                    return <Tile
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
                                        toPagePath={selectPageFunctionBasedOnType(type, id)}
                                        picture={getFirstImage(images)}
                                        title={name}
                                        subInfo={
                                            computedSubInfo
                                            // !subInfo && !isArtistsList ?
                                            //     getSubInfoList(list)[index] :
                                            //     subInfo

                                            // !areHorizontatItems ? (
                                            //     isRenderSubInfo ?
                                            //         renderTileSubInfo({
                                            //             isArtistsListCondition: isArtistsList,
                                            //             artistType: type,
                                            //             albumType: album_type,
                                            //             albumReleaseDate: release_date,
                                            //         }) :
                                            //         isArtistsList ?
                                            //             type :
                                            //             renderArtistLink(artists, isTileActive(index, listId))
                                            // ) :
                                            //     subInfo
                                        }
                                        isArtistPictureStyle={isArtistsList}
                                        useHorizontalLayout={areHorizontatItems}
                                        useSubInfoAsLink={
                                            !isRenderSubInfo && !isArtistsList
                                        }
                                    />
                                }}
                                showPreviewListPart={areHorizontatItems || !showPreviewListPart ? false : true}
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