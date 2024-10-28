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
import { isNotEmpty } from "../../../../common/functions/isNotEmpty";
import { useCurrentCategoryData } from "../../hooks/useCurrentCategoryData";
import { isMatch } from "../../../../common/functions/isMatch";
import { artistAppearsOnSelectors } from "../../slices/artistAppearsOnSlice";
import { findMatchingValueByKey } from "../../../../common/functions/findMatchingValueByKey";
import { matchFullListDataByType } from "../../../../common/functions/matchFullListDataByType";
import { nanoid } from "nanoid";
import { useActiveTile } from "../../../../common/hooks/useActiveTile";
import { MediaItem } from "../../../../common/interfaces/MediaItem";
import {
    albumsCategory,
    compilationsCategory,
    popularReleasesCategory,
    singlesCategory
} from "../../constants/categories";
import {
    allParamDiscography,
    relatedArtistsParam,
    albumsParamDiscography,
    singleParamDiscography,
    artistAppearsOnParam,
    compilationParamDiscography
} from "../../constants/params";
import { WithReleaseDate } from "../../../../common/interfaces/WithReleaseDate";
import { sortFromOldestToNewest } from "../../../../common/functions/sortFromOldestToNewest";
import { TrackListItem } from "../../../../common/interfaces/TrackCollection";
import { getMainArtistID } from "../../../../common/functions/getMainArtistID";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";

interface MainContentProps {
    name: string;
};

export const MainContent = ({ name }: MainContentProps) => {

    const { id, type = "" } = useParams<{ id: string; type?: string }>();

    const replaceReleaseDateIfCurrentYear = <T extends WithReleaseDate>(listItem: T): T => {
        return isLatestReleased(listItem) ?
            { ...listItem, release_date: "Latest Release" } :
            listItem;
    };

    const removeDuplicates = <T extends { name: string }>(list: T[] = []): T[] => {
        const caughtDuplicates = new Set();

        return list.filter(({ name }) => {
            const keyValue = name;
            return !caughtDuplicates.has(keyValue) && caughtDuplicates.add(keyValue);
        });
    };

    const setNewestPopularReleaseItemFirstIfIsLatestRelease = <T extends WithReleaseDate>(newestPopularReleaseItem: T | undefined) => (
        newestPopularReleaseItem && isLatestReleased(newestPopularReleaseItem)
            ? [{ ...newestPopularReleaseItem }, ...(popularReleases?.slice() ?? [])]
            : popularReleases || []
    );

    const appearsOn = useSelector(artistAppearsOnSelectors.selectDatas)?.datas.items;
    const albums = useSelector(artistAlbumsSelectors.selectDatas)?.datas.items;
    const compilations = useSelector(artistCompilationSelectors.selectDatas)?.datas.items;
    const singles = useSelector(artistSinglesSelectors.selectDatas)?.datas.items;
    const relatedArtists = useSelector(relatedArtistsSelectors.selectDatas)?.datas.artists;
    const topTracks: TrackListItem[] = useSelector(artistTopTracksSelectors.selectDatas)?.datas.tracks;

    //Dodać typ do album
    const popularReleases: MediaItem[] = topTracks?.map(({ album }: any) => album);
    const newestPopularReleaseItem = sortFromOldestToNewest(popularReleases)[0];
    const updatedPopularReleases = setNewestPopularReleaseItemFirstIfIsLatestRelease(newestPopularReleaseItem);

    const allCategoriesList = [
        ...updatedPopularReleases,
        ...albums || [],
        ...compilations || [],
        ...singles || [],
    ];
    const sortedAllCategoriesListFromOldestToNewest = sortFromOldestToNewest(allCategoriesList);

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({ key: popularReleasesCategory, value: allCategoriesList });
    const { setActiveTile, isTileActive } = useActiveTile();
    const { fullListContent, fullListTitle, isFullListArtistsList } = matchFullListDataByType([
        { key: allParamDiscography, value: sortedAllCategoriesListFromOldestToNewest },
        { key: albumsParamDiscography, value: albums },
        { key: compilationParamDiscography, value: compilations },
        { key: singleParamDiscography, value: singles },
        { key: relatedArtistsParam, value: relatedArtists, title: "Fans also like", isArtistsList: true },
        { key: artistAppearsOnParam, value: appearsOn, title: "Appears On", isArtistsList: false },
    ], type);

    return (
        <>
            {type ?
                <TilesList
                    title={fullListTitle || name}
                    list={removeDuplicates(fullListContent)}
                    renderItem={
                        (({ id, name, images, album_type = "", artists }: MediaItem, index: number) => (
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
                                toPage={isFullListArtistsList ? toArtist({ id }) : toAlbum({ albumID: id, artistID: getMainArtistID(artists) })}
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
                                    isNotEmpty(popularReleases) && (
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
                                    isNotEmpty(albums) && (
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
                                    isNotEmpty(singles) && (
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
                                    isNotEmpty(compilations) && (
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
                        list={removeDuplicates(currentCategoryData.list)}
                        renderItem={
                            ((item, index) => {
                                const { id, name, release_date, images, album_group = "", album_type = "", artists } = item;

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
                                        toPage={toAlbum({ albumID: id, artistID: getMainArtistID(artists) })}
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
                        fullListData={
                            {
                                pathname: toArtist({
                                    id: id!,
                                    additionalPath:
                                        findMatchingValueByKey<string>(
                                            [
                                                { key: popularReleasesCategory, value: allParamDiscography },
                                                { key: albumsCategory, value: albumsParamDiscography },
                                                { key: compilationsCategory, value: compilationParamDiscography },
                                                { key: singlesCategory, value: singleParamDiscography },
                                            ], currentCategoryData.category
                                        )?.value
                                }),
                                text: fullListLinkText,
                            }
                        }
                    />
                    {
                        isNotEmpty(relatedArtists) && (
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
                                fullListData={{
                                    pathname: toArtist({ id: id!, additionalPath: relatedArtistsParam }),
                                    text: fullListLinkText
                                }}
                            />
                        )
                    }
                    {
                        isNotEmpty(appearsOn) && (
                            <TilesList
                                title="Appears on"
                                list={appearsOn}
                                renderItem={({ images, name, type, id, artists }, index) => (
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
                                        toPage={toAlbum({ albumID: id, artistID: artists[0].id! })}
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={type || ""}
                                        isArtistPictureStyle={false}
                                    />
                                )}
                                hideRestListPart
                                fullListData={{
                                    pathname: toArtist({
                                        id: id!,
                                        additionalPath: artistAppearsOnParam,
                                    }),
                                    text: fullListLinkText,
                                }}
                            />
                        )
                    }
                </>
            }
        </>
    );
};