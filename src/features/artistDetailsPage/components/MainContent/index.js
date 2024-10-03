import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { artistAlbumsSelectors } from "../../slices/artistAlbumsSlice";
import { relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { TilesList } from "../../../../common/components/TilesList";
import { Tile } from "../../../../common/components/Tile";
import { Table } from "../../../../common/components/Table";
import { toArtist } from "../../../../common/functions/routes";
import { ListToggleButton } from "../../../../common/components/ListToggleButton";
import { ItemsList } from "../../../../common/components/ItemsList";
import { artistSinglesSelectors } from "../../slices/artistSinglesSlice";
import { artistCompilationSelectors } from "../../slices/artistCompilationSlice";
import { getYear } from "../../../../common/functions/getYear";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { removeDuplicates } from "../../functions/removeDuplicates"
import { replaceReleaseDateIfCurrentYear } from "../../functions/replaceReleaseDateIfCurrentYear";
import { isLatestReleased } from "../../functions/isLatestReleased";
import { isListEmpty } from "../../functions/isListEmpty";
import { useCurrentCategoryData } from "../../hooks/useCurrentCategoryData";
import { popularReleasesCategory, albumsCategory, singlesCategory, compilationsCategory } from "../../constants/listCategories";
import { isMatch } from "../../functions/isMatch";
import { artistAppearsOnSelectors } from "../../slices/artistAppearsOnSlice";
import { artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { Banner } from "../../../../common/components/Banner";
import { allParamDiscography, albumsParamDiscography, compilationParamDiscography, singleParamDiscography, relatedArtistsParam, artistAppearsOnParam } from "../../constants/paramCategories";
import { findMatchingValueByKey } from "../../../../common/functions/findMatchingValueByKey";
import { selectDataView } from "../../../../common/functions/selectDataView";

export const MainContent = () => {
    const { id, type } = useParams();

    const sortFromOldestToNewest = (array = []) => [...array].sort(
        (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date))
    );

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

    const setNewestPopularReleaseItemIfItLatestRelease = () => (
        isLatestReleased(newestPopularReleaseItem) ?
            [
                { ...(newestPopularReleaseItem ?? {}) },
                ...(popularReleases?.slice() ?? []),
            ] :
            popularReleases
    );

    const allCategoriesList = [
        ...setNewestPopularReleaseItemIfItLatestRelease(),
        ...albums,
        ...compilations,
        ...singles,
    ];

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData(
        { key: popularReleasesCategory, value: allCategoriesList }
    );

    const { selectedList, selectedTitle, isArtistsList } = selectDataView([
        { key: allParamDiscography, value: allCategoriesList },
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
                        title={selectedTitle || name}
                        list={removeDuplicates(selectedList)}
                        renderItem={
                            (({ id, name, images, album_type = "" }) => (
                                <Tile
                                    navigateTo={toArtist({ id: id })}
                                    id={id}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={album_type}
                                    useArtistPictureStyle={isArtistsList || false}
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
                        />
                        <Table list={topTracks} />
                        <TilesList
                            title="Discography"
                            subContent={
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
                                    const { id, name, release_date, images, album_group = "", album_type = "" } = item;

                                    return (
                                        <Tile
                                            id={id}
                                            picture={images[0].url}
                                            title={name}
                                            subInfo={`
                                            ${index === 0 && isLatestReleased(item) ?
                                                    replaceReleaseDateIfCurrentYear(item).release_date :
                                                    getYear(release_date)
                                                }
                                        ${capitalizeFirstLetter(album_group) || capitalizeFirstLetter(album_type)}
                                        `}
                                        />
                                    )
                                })
                            }
                            hideRestListPart
                            extraContentText="Show all"
                            // extraContentAction={() => setListView(listView)}
                            navigateTo={toArtist({
                                id: id,
                                additionalPath: findMatchingValueByKey(
                                    [
                                        { key: popularReleasesCategory, value: allParamDiscography },
                                        { key: albumsCategory, value: albumsParamDiscography },
                                        { key: compilationsCategory, value: compilationParamDiscography },
                                        { key: singlesCategory, value: singleParamDiscography },
                                    ], currentCategoryData.category
                                ).value,
                            })}
                        />
                        < TilesList
                            title="Fans also like"
                            list={relatedArtists}
                            renderItem={({ images, name, type, id }) => (
                                <Tile
                                    key={id}
                                    id={id}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type}
                                    useArtistPictureStyle
                                    navigateTo={toArtist({ id })}
                                />
                            )}
                            hideRestListPart
                            extraContentText="Show all"
                            navigateTo={toArtist({
                                id: id,
                                additionalPath: relatedArtistsParam
                            })}
                        />
                        <TilesList
                            title="Appears on"
                            list={appearsOn}
                            renderItem={({ images, name, type, id }) => (
                                <Tile
                                    key={id}
                                    id={id}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type}
                                // navigateTo={navigate(toArtist({ id }))}
                                />
                            )}
                            hideRestListPart
                            extraContentText="Show all"
                            navigateTo={toArtist({
                                id: id,
                                additionalPath: artistAppearsOnParam,
                            })}
                        />
                    </>
            }
        </>
    );
};