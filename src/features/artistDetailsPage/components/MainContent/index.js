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
import { ItemsList } from "../../../../common/components/ItemsList";
import { artistSinglesSelectors } from "../../slices/artistSinglesSlice";
import { artistCompilationSelectors } from "../../slices/artistCompilationSlice";
import { getYear } from "../../../../common/functions/getYear";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { isLatestReleased } from "../../../../common/functions/isLatestReleased";
import { isListEmpty } from "../../../../common/functions/isListEmpty";
import { useCurrentCategoryData } from "../../hooks/useCurrentCategoryData";
import { isMatch } from "../../../../common/functions/isMatch";
import { artistAppearsOnSelectors } from "../../slices/artistAppearsOnSlice";
import { artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { Banner } from "../../../../common/components/Banner";
import { findMatchingValueByKey } from "../../../../common/functions/findMatchingValueByKey";
import { matchFullListDataByType } from "../../../../common/functions/matchFullListDataByType";
import { titleExtraAsideContentText } from "../../../../common/constants/titleExtraAsideContentText";
import { nanoid } from "nanoid";

export const MainContent = () => {
    const { id, type } = useParams();

    const sortFromOldestToNewest = (array = []) => {
        return [...array].sort(
            (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date))
        );
    };

    const removeDuplicates = (albums = []) => {
        const caughtDuplicates = new Set();

        return albums.filter(({ name }) => {
            const keyValue = name;
            return !caughtDuplicates.has(keyValue) && caughtDuplicates.add(keyValue);
        });
    };

    const replaceReleaseDateIfCurrentYear = album => {
        return isLatestReleased(album) ?
            { ...album, release_date: "Latest Release" } :
            album;
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

    const name = details?.name;
    const followers = details?.followers;
    const images = details?.images;

    const popularReleases = topTracks?.map(({ album }) => album);
    const newestPopularReleaseItem = sortFromOldestToNewest(popularReleases)[0];

    const setNewestPopularReleaseItemFirstIfItLatestRelease = () => (
        isLatestReleased(newestPopularReleaseItem) ?
            [
                { ...(newestPopularReleaseItem ?? {}) },
                ...(popularReleases?.slice() ?? []),
            ] :
            popularReleases
    );

    const allCategoriesList = [
        ...setNewestPopularReleaseItemFirstIfItLatestRelease(),
        ...albums,
        ...compilations,
        ...singles,
    ];
    const sortedAllCategoriesListFromOldestToNewest = sortFromOldestToNewest(allCategoriesList);

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData(
        { key: popularReleasesCategory, value: sortedAllCategoriesListFromOldestToNewest }
    );

    const { fullListContent, fullListTitle, isFullListArtistsList } = matchFullListDataByType([
        { key: allParamDiscography, value: sortedAllCategoriesListFromOldestToNewest },
        { key: albumsParamDiscography, value: albums },
        { key: compilationParamDiscography, value: compilations },
        { key: singleParamDiscography, value: singles },
        { key: relatedArtistsParam, value: relatedArtists, title: "Fans also like", isArtistsList: true },
        { key: artistAppearsOnParam, value: appearsOn, title: "Appears On", isArtistsList: false },
    ], type)

    return (
        <>
            {
                type ?
                    <TilesList
                        title={fullListTitle || name}
                        list={removeDuplicates(fullListContent)}
                        renderItem={
                            (({ id, name, images, album_type = "" }) => (
                                <Tile
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
                        <Banner
                            picture={images ? images[0]?.url : ''}
                            title={name}
                            caption="Verified artist"
                            metaDatas={`${followers?.total?.toLocaleString()} followers`}
                            isArtistPictureStyle
                        />
                        <Table list={topTracks} />
                        <TilesList
                            title="Discography"
                            subExtraContent={
                                <ItemsList
                                    items={
                                        <>
                                            {
                                                isListEmpty(popularReleases) && (
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
                                                isListEmpty(albums) && (
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
                                                isListEmpty(singles) && (
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
                                                isListEmpty(compilations) && (
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
                                />
                            }
                            list={removeDuplicates(currentCategoryData.list)}
                            renderItem={
                                ((item, index) => {
                                    const { name, release_date, images, album_group = "", album_type = "" } = item;

                                    return (
                                        <Tile
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
                            titleExtraAsideContent={
                                {
                                    link: toArtist({
                                        id: id,
                                        additionalPath: findMatchingValueByKey(
                                            [
                                                { key: popularReleasesCategory, value: allParamDiscography },
                                                { key: albumsCategory, value: albumsParamDiscography },
                                                { key: compilationsCategory, value: compilationParamDiscography },
                                                { key: singlesCategory, value: singleParamDiscography },
                                            ], currentCategoryData.category
                                        ).value,
                                    }),
                                    text: titleExtraAsideContentText
                                }
                            }
                        />
                        < TilesList
                            title="Fans also like"
                            list={relatedArtists}
                            renderItem={({ images, name, type, id }) => (
                                <Tile
                                    key={nanoid()}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type}
                                    useArtistPictureStyle
                                    toPage={toArtist({ id })}
                                    isArtistPictureStyle
                                />
                            )}
                            hideRestListPart
                            titleExtraAsideContent={
                                {
                                    link: toArtist({
                                        id: id,
                                        additionalPath: relatedArtistsParam
                                    }),
                                    text: titleExtraAsideContentText
                                }
                            }
                        />
                        <TilesList
                            title="Appears on"
                            list={appearsOn}
                            renderItem={({ images, name, type, id }) => (
                                <Tile
                                    key={nanoid()}
                                    toPage={toAlbum()}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type}
                                    isArtistPictureStyle={false}
                                />
                            )}
                            hideRestListPart
                            titleExtraAsideContent={
                                {
                                    link: toArtist({
                                        id: id,
                                        additionalPath: artistAppearsOnParam,
                                    }),
                                    text: titleExtraAsideContentText,
                                }
                            }
                        />
                    </>
            }
        </>
    );
};