import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { TilesList } from "../../../../common/components/TilesList";
import { Tile } from "../../../../common/components/Tile";
import { Table } from "../../../../common/components/Table";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { getYear } from "../../../../common/functions/getYear";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { isLatestReleased } from "../../../../common/functions/isLatestReleased";
import { useCurrentCategoryData } from "../../hooks/useCurrentCategoryData";
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
    allReleaseDiscography,
    relatedArtistsParam,
    albumsParamDiscography,
    singleParamDiscography,
    artistAppearsOnParam,
    compilationParamDiscography
} from "../../../../common/constants/params";
import { WithReleaseDate } from "../../../../common/interfaces/WithReleaseDate";
import { sortFromOldestToNewest } from "../../../../common/functions/sortFromOldestToNewest";
import { TrackListItem } from "../../../../common/interfaces/TrackCollection";
import { getMainArtistID } from "../../../../common/functions/getMainArtistID";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { setNewestPopularReleaseItemFirstIfIsLatestRelease } from "../../../../common/functions/setNewestPopularReleaseItemFirstIfIsLatestRelease";
import { removeDuplicates } from "../../../../common/functions/removeDuplicates";
import { ListToggleButtonsSection } from "../../../../common/components/ListToggleButtonsSection";
import { isMatch } from "../../../../common/functions/isMatch";
interface MainContentProps {
    name: string;
    allReleases: any;
};

export const MainContent = ({ name, allReleases }: MainContentProps) => {

    const { id, type = "" } = useParams<{ id: string; type?: string }>();

    const replaceReleaseDateIfCurrentYear = <T extends WithReleaseDate>(listItem: T): T => {
        return isLatestReleased(listItem) ?
            { ...listItem, release_date: "Latest Release" } :
            listItem;
    };

    const filterByAlbumGroup = (targetGroup: string) => allReleases?.filter(({ album_group }: any) => isMatch(album_group, targetGroup));
    const albums = filterByAlbumGroup("album");
    const compilations = filterByAlbumGroup("compilation");
    const singles = filterByAlbumGroup("single");
    const appearsOn = filterByAlbumGroup("appears_on");

    const allReleasesWithoutAppearsOn = allReleases?.filter(({ album_group }: any) => album_group !== "appears_on");
    const sortedAllReleasesFromOldestToNewest = sortFromOldestToNewest(allReleasesWithoutAppearsOn);

    const relatedArtists = useSelector(relatedArtistsSelectors.selectDatas)?.datas.artists;
    const topTracks: TrackListItem[] = useSelector(artistTopTracksSelectors.selectDatas)?.datas.tracks;

    const topTracksAlbumsList = topTracks?.map(({ album }: any) => album);
    const newestTopTrackAlbumItem = sortFromOldestToNewest(topTracksAlbumsList)[0];
    const updatedTopTracksAlbumsList = setNewestPopularReleaseItemFirstIfIsLatestRelease(newestTopTrackAlbumItem, topTracksAlbumsList);

    const popularReleases = [...updatedTopTracksAlbumsList || [], ...allReleasesWithoutAppearsOn || []];
    const uniquePopularReleases = removeDuplicates(popularReleases, "name");

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({ key: popularReleasesCategory, value: uniquePopularReleases });

    const { setActiveTile, isTileActive } = useActiveTile();

    const { fullListContent, fullListTitle, isFullListArtistsList } = matchFullListDataByType([
        { key: allReleaseDiscography, value: sortedAllReleasesFromOldestToNewest },
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
                    list={removeDuplicates(fullListContent, "name")}
                    renderItem={
                        (({ id, name, images, album_type = "", artists, release_date, type }: MediaItem, index: number) => (
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
                                subInfo={isFullListArtistsList ? `${type}` : `${album_type} • ${getYear(release_date)}`}
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
                            <ListToggleButtonsSection
                                listToggleButtonDatasList={[
                                    { list: uniquePopularReleases, category: popularReleasesCategory, text: "Popular releases" },
                                    { list: albums, category: albumsCategory, text: "Albums" },
                                    { list: singles, category: singlesCategory, text: "Singles and EPs" },
                                    { list: compilations, category: compilationsCategory, text: "Compilations" },
                                ]}
                                setCurrentCategoryData={setCurrentCategoryData}
                                targetCategory={currentCategoryData.category}
                            />
                        }
                        list={removeDuplicates(currentCategoryData.list, "name")}
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
                                                ${index === 0 && isLatestReleased(item) ? replaceReleaseDateIfCurrentYear(item).release_date : getYear(release_date)} •
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
                                                { key: popularReleasesCategory, value: allReleaseDiscography },
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
                </>
            }
        </>
    );
};