import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { artistAlbumsSelectors } from "../../slices/artistAlbumsSlice";
import { relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { TilesList } from "../../../../common/components/TilesList";
import { Tile } from "../../../../common/components/Tile";
import { Table } from "../../../../common/components/Table";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { ListToggleButton } from "../../../../common/components/ListToggleButton";
import { artistSinglesSelectors } from "../../slices/artistSinglesSlice";
import { artistCompilationSelectors } from "../../slices/artistCompilationSlice";
import { getYear } from "../../../../common/functions/getYear";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { isLatestReleased } from "../../../../common/functions/isLatestReleased";
import { isEmpty } from "../../../../common/functions/isEmpty";
import { useCurrentCategoryData } from "../../hooks/useCurrentCategoryData";
import { isMatch } from "../../../../common/functions/isMatch";
import { artistAppearsOnSelectors } from "../../slices/artistAppearsOnSlice";
import { artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { findMatchingValueByKey } from "../../../../common/functions/findMatchingValueByKey";
import { matchFullListDataByType } from "../../../../common/functions/matchFullListDataByType";
import { nanoid } from "nanoid";
import { useActiveTile } from "../../../../common/hooks/useActiveTile";
import { MediaItemData } from "../../../../common/interfaces/MediaItemData";
import { TrackListItem } from "../../../../common/interfaces/TrackListItemInterfaces";

export const MainContent = () => {
    const { id, type = "" } = useParams<{ id: string; type?: string }>();

    interface ReleaseItem {
        release_date: string;
    };

    const sortFromOldestToNewest = (array: ReleaseItem[] = []): ReleaseItem[] => {
        return [...array].sort(
            (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date))
        );
    };

    const removeDuplicates = (list: MediaItemData[] = []): MediaItemData[] => {
        const caughtDuplicates = new Set();

        return list.filter(({ name }) => {
            const keyValue = name;
            return !caughtDuplicates.has(keyValue) && caughtDuplicates.add(keyValue);
        });
    };

    const replaceReleaseDateIfCurrentYear = (listItem: ReleaseItem): ReleaseItem => {
        return isLatestReleased(listItem) ?
            { ...listItem, release_date: "Latest Release" } :
            listItem;
    };

    const popularReleasesCategory = "popularReleases";
    const albumsCategory = "albums";
    const singlesCategory = "singles";
    const compilationsCategory = "compilations";

    const allParamDiscography = "all";
    const albumsParamDiscography = "album";
    const singleParamDiscography = "single";
    const compilationParamDiscography = "compilation";
    const relatedArtistsParam = "related";
    const artistAppearsOnParam = "appears-on";

    const appearsOn = useSelector(artistAppearsOnSelectors.selectDatas)?.datas.items;
    const albums = useSelector(artistAlbumsSelectors.selectDatas)?.datas.items;
    const compilations = useSelector(artistCompilationSelectors.selectDatas)?.datas.items;
    const singles = useSelector(artistSinglesSelectors.selectDatas)?.datas.items;
    const relatedArtists = useSelector(relatedArtistsSelectors.selectDatas)?.datas.artists;
    const topTracks = useSelector(artistTopTracksSelectors.selectDatas)?.datas.tracks;
    const details = useSelector(artistDetailsSelectors.selectDatas)?.datas;

    const popularReleases = topTracks?.map(({ album }: TrackListItem) => album);
    const newestPopularReleaseItem = sortFromOldestToNewest(popularReleases)[0];

    const setNewestPopularReleaseItemFirstIfIsLatestRelease = (newestPopularReleaseItem: ReleaseItem) => (
        //wartość do zwrócenia
        isLatestReleased(newestPopularReleaseItem) ?
            [
                { ...(newestPopularReleaseItem ?? {}) },
                ...(popularReleases?.slice() ?? []),
            ] :
            popularReleases
    );

    const allCategoriesList = [
        ...setNewestPopularReleaseItemFirstIfIsLatestRelease(newestPopularReleaseItem),
        ...albums,
        ...compilations,
        ...singles,
    ];
    const sortedAllCategoriesListFromOldestToNewest = sortFromOldestToNewest(allCategoriesList);

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData(
        { key: popularReleasesCategory, value: allCategoriesList }
    );

    const { setActiveTile, isTileActive } = useActiveTile();

    const { fullListContent, fullListTitle, isFullListArtistsList } = matchFullListDataByType([
        { key: allParamDiscography, value: sortedAllCategoriesListFromOldestToNewest },
        { key: albumsParamDiscography, value: albums },
        { key: compilationParamDiscography, value: compilations },
        { key: singleParamDiscography, value: singles },
        { key: relatedArtistsParam, value: relatedArtists, title: "Fans also like", isArtistsList: true },
        { key: artistAppearsOnParam, value: appearsOn, title: "Appears On", isArtistsList: false },
    ], type);

    const listToDisplay = removeDuplicates(type ? fullListContent : currentCategoryData.list);

    return (
        <>
            {
                type ?
                    <TilesList
                        title={fullListTitle || details.name}
                        list={listToDisplay}
                        renderItem={
                            (({ id, name, images, album_type = "" }: MediaItemData, index: number) => (
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
                                    toPage={toArtist({ id: id })}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={album_type}
                                    isArtistPictureStyle={isFullListArtistsList || false}
                                />
                            ))
                        }
                    />
                    :
                    <>
                        <Table list={topTracks} />
                        <TilesList
                            title="Discography"
                            subExtraContent={
                                <>
                                    {
                                        isEmpty(popularReleases) && (
                                            <ListToggleButton
                                                toggleList={() => setCurrentCategoryData({
                                                    category: popularReleasesCategory,
                                                    list: allCategoriesList,
                                                })}
                                                text="Popular releases"
                                                isActive={isMatch(popularReleasesCategory, currentCategoryData.category)}
                                            />
                                        )
                                    }
                                    {
                                        isEmpty(albums) && (
                                            <ListToggleButton
                                                toggleList={() => setCurrentCategoryData({
                                                    category: albumsCategory,
                                                    list: albums,
                                                })}
                                                text="Albums"
                                                isActive={isMatch(albumsCategory, currentCategoryData.category)}
                                            />
                                        )
                                    }
                                    {
                                        isEmpty(singles) && (
                                            <ListToggleButton
                                                toggleList={() => setCurrentCategoryData({
                                                    category: singlesCategory,
                                                    list: singles,
                                                })}
                                                text="Singles"
                                                isActive={isMatch(singlesCategory, currentCategoryData.category)}
                                            />
                                        )
                                    }
                                    {
                                        isEmpty(compilations) && (
                                            <ListToggleButton
                                                toggleList={() => setCurrentCategoryData({
                                                    category: compilationsCategory,
                                                    list: compilations,
                                                })}
                                                text="Compilations"
                                                isActive={isMatch(compilationsCategory, currentCategoryData.category)}
                                            />
                                        )
                                    }
                                </>
                            }
                            list={listToDisplay}
                            renderItem={
                                ((item, index) => {
                                    const { name, release_date, images, album_group = "", album_type = "" } = item;

                                    return (
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
                                            toPage={toAlbum()}
                                            picture={images[0].url}
                                            title={name}
                                            subInfo={`
                                                ${index === 0 && isLatestReleased(item) ? replaceReleaseDateIfCurrentYear(item).release_date : getYear(release_date)}
                                                ${capitalizeFirstLetter(album_group) || capitalizeFirstLetter(album_type)}
                                            `}
                                            isArtistPictureStyle={false}
                                        />
                                    )
                                })
                            }
                            hideRestListPart
                            fullListPathname={toArtist({
                                id: id!,
                                additionalPath:
                                    findMatchingValueByKey(
                                        [
                                            { key: popularReleasesCategory, value: allParamDiscography },
                                            { key: albumsCategory, value: albumsParamDiscography },
                                            { key: compilationsCategory, value: compilationParamDiscography },
                                            { key: singlesCategory, value: singleParamDiscography },
                                        ], currentCategoryData.category
                                    )?.value
                            })}
                        />
                        {/* {
                            renderTilesList({
                                list:relatedArtists,
                                title:"Fans also like",
                                isArtistPictureStyle:true,
                                toPage: (id) => toArtist({id}),
                                tilesListID:2,
                                hideRestListPart:true,
                            })
                        } */}
                        < TilesList
                            title="Fans also like"
                            list={relatedArtists}
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
                                    toPage={toArtist({ id })}
                                    isArtistPictureStyle
                                />
                            )}
                            hideRestListPart
                            fullListPathname={toArtist({
                                id: id!,
                                additionalPath: relatedArtistsParam
                            })}
                        />
                        <TilesList
                            title="Appears on"
                            list={appearsOn}
                            renderItem={({ images, name, type, id }, index) => (
                                <Tile
                                    isActive={isTileActive(index, 3)}
                                    mouseEventHandlers={{
                                        enter: () => setActiveTile({
                                            activeTileIndex: index,
                                            activeTilesListID: 3,
                                        }),
                                        leave: () => setActiveTile({
                                            activeTileIndex: undefined,
                                            activeTilesListID: undefined,
                                        }),
                                    }}
                                    key={nanoid()}
                                    toPage={toAlbum()}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type || ""}
                                    isArtistPictureStyle={false}
                                />
                            )}
                            hideRestListPart
                            fullListPathname={toArtist({
                                id: id!,
                                additionalPath: artistAppearsOnParam,
                            })}
                        />
                    </>
            }
        </>
    );
};