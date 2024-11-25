import { useParams } from "react-router-dom";
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
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { setNewestPopularReleaseItemFirstIfIsLatestRelease } from "../../../../common/functions/setNewestPopularReleaseItemFirstIfIsLatestRelease";
import { removeDuplicates } from "../../../../common/functions/removeDuplicates";
import { ListToggleButtonsSection } from "../../../../common/components/ListToggleButtonsSection";
import { filterByAlbumGroup } from "../../../../common/functions/filterByAlbumGroup";
import { getImage } from "../../../../common/functions/getImage";

interface TopTrackData {
    topTracksList: any;
    topTracksAlbumsList: any;
};
interface MainContentProps {
    artistName: string;
    artistAllReleas: any;
    artistRelatedArtists: any;
    artistTopTrackData: TopTrackData;
};

export const MainContent = ({
    artistName,
    artistTopTrackData: { topTracksList, topTracksAlbumsList },
    artistAllReleas,
    artistRelatedArtists,
}: MainContentProps) => {

    const { id, type = "" } = useParams<{ id: string; type?: string }>();

    const replaceReleaseDateIfCurrentYear = <T extends WithReleaseDate>(listItem: T): T => {
        return isLatestReleased(listItem) ?
            { ...listItem, release_date: "Latest Release" } :
            listItem;
    };

    const albums = filterByAlbumGroup(artistAllReleas, "album");
    const compilations = filterByAlbumGroup(artistAllReleas, "compilation");
    const singles = filterByAlbumGroup(artistAllReleas, "single");
    const appearsOn = filterByAlbumGroup(artistAllReleas, "appears_on");

    const allReleasesWithoutAppearsOn = artistAllReleas?.filter(({ album_group }: any) => album_group !== "appears_on");

    const newestTopTrackAlbumItem = sortFromOldestToNewest(topTracksAlbumsList)[0];
    const updatedTopTracksAlbumsList = setNewestPopularReleaseItemFirstIfIsLatestRelease(newestTopTrackAlbumItem, topTracksAlbumsList);

    const popularReleases = [...updatedTopTracksAlbumsList || [], ...allReleasesWithoutAppearsOn || []];
    const uniquePopularReleases = removeDuplicates(popularReleases, "name");

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({ key: popularReleasesCategory, value: uniquePopularReleases });
    const { setActiveTile, isTileActive } = useActiveTile();

    const { fullListContent, fullListTitle, isFullListArtistsList } = matchFullListDataByType([
        { key: allReleaseDiscography, value: sortFromOldestToNewest(uniquePopularReleases) },
        { key: albumsParamDiscography, value: albums },
        { key: compilationParamDiscography, value: compilations },
        { key: singleParamDiscography, value: singles },
        { key: relatedArtistsParam, value: artistRelatedArtists, title: "Fans also like", isArtistsList: true },
        { key: artistAppearsOnParam, value: appearsOn, title: "Appears On", isArtistsList: false },
    ], type);

    return (
        <>
            {type ?
                <TilesList
                    title={fullListTitle || artistName}
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
                                toPage={isFullListArtistsList ? toArtist({ id }) : toAlbum({ id: id })}
                                picture={getImage(images)}
                                title={name}
                                subInfo={isFullListArtistsList ? `${type}` : `${album_type} • ${getYear(release_date)}`}
                                isArtistPictureStyle={isFullListArtistsList || false}
                            />
                        ))
                    }
                />
                :
                <>
                    <Table list={topTracksList} caption="Popular" />
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
                                        toPage={toAlbum({ id: id })}
                                        picture={getImage(images)}
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
                        list={artistRelatedArtists}
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
                                picture={getImage(images)}
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
                                toPage={toAlbum({ id: id })}
                                picture={getImage(images)}
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