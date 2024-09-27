import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { artistAlbumsSelectors } from "../../slices/artistAlbumsSlice";
import { relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { TilesList } from "../../../../common/components/TilesList";
import { Tile } from "../../../../common/components/Tile";
import { Table } from "../../../../common/components/Table";
import { toArtist, toListPage } from "../../../../common/functions/routes";
import { ListToggleButton } from "../../../../common/components/ListToggleButton";
import { ItemsList } from "../../../../common/components/ItemsList";
import { artistSinglesSelectors } from "../../slices/artistSinglesSlice";
import { artistCompilationSelectors } from "../../slices/artistCompilationSlice";
import { getYear } from "../../../../common/functions/getYear";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { setList } from "../../../ListPage/listSlice";
import { removeDuplicates } from "../../functions/removeDuplicates"
import { replaceReleaseDateIfCurrentYear } from "../../functions/replaceReleaseDateIfCurrentYear";
import { isLatestReleased } from "../../functions/isLatestReleased";
import { isListEmpty } from "../../functions/isListEmpty";
import { useCurrentListCategory } from "../../hooks/useCurrentListCategory";
import { popularReleasesCategory, albumsCategory, singlesCategory, compilationsCategory } from "../../constants/listCategories";
import { isMatch } from "../../functions/isMatch";
import { artistAppearsOnSelectors } from "../../slices/artistAppearsOnSlice";
import { useState } from "react";
import { artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { Banner } from "../../../../common/components/Banner";
import { findMatchingValueByKey } from "../../../../common/functions/findMatchingValueByKey";
import { useListView } from "../../hooks/useListViev";
import { allParamCategory, albumsParamCategory, compilationParamCategory, singleParamCategory } from "../../constants/paramCategories";

export const MainContent = () => {
    const { id, type } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const sortFromOldestToNewest = (array = []) => {

        return (
            array.slice().sort(
                (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date))
            )
        );
    };

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
    const newestPopularRelease = popularReleases?.slice().sort(
        (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date))
    )[0];

    const sortedPopularReleasesWithNewestFirst = [
        { ...(newestPopularRelease ?? {}) },
        ...(popularReleases?.slice() ?? []),
    ];

    const allCategoriesList = [
        ...sortedPopularReleasesWithNewestFirst,
        ...albums,
        ...compilations,
        ...singles,
    ];
    const previewAllCategoriesList = sortFromOldestToNewest(allCategoriesList);

    const { listMachtedByCategory, currentListCategory, setCurrentListCategory } = useCurrentListCategory(popularReleasesCategory, type, {
        albums,
        singles,
        compilations,
        allCategoriesList,
        previewAllCategoriesList,
    });

    const { listView, setListView } = useListView(currentListCategory, type, [
        { key: allParamCategory, value: allCategoriesList },
        { key: albumsParamCategory, value: albums },
        { key: compilationParamCategory, value: compilations },
        { key: singleParamCategory, value: singles },
    ])

    const listToDisplay = removeDuplicates(listMachtedByCategory || listView.list);

    return (
        <>
            {
                type ?
                    <TilesList
                        title={name}
                        list={listToDisplay}
                        renderItem={
                            (({ id, name, images, album_group = "", album_type = "" }) => (
                                <Tile
                                    id={id}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={album_group || album_type}
                                />
                            ))
                        }
                    /> :
                    <>
                        <Banner
                            picture={images ? images[0]?.url : ''}
                            title={name}
                            caption="Verified artist"
                            metaDatas={`${followers?.total?.toLocaleString()} followers`}
                        />
                        <Table />
                        <TilesList
                            title="Discography"
                            subContent={
                                <ItemsList
                                    items={
                                        <>
                                            {
                                                isListEmpty(popularReleases) && (
                                                    <ListToggleButton
                                                        toggleList={() => setCurrentListCategory(popularReleasesCategory)}
                                                        text="Popular releases"
                                                        isActive={isMatch(popularReleasesCategory, currentListCategory)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(albums) && (
                                                    <ListToggleButton
                                                        toggleList={() => setCurrentListCategory(albumsCategory)}
                                                        text="Albums"
                                                        isActive={isMatch(albumsCategory, currentListCategory)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(singles) && (
                                                    <ListToggleButton
                                                        toggleList={() => setCurrentListCategory(singlesCategory)}
                                                        text="Singles"
                                                        isActive={isMatch(singlesCategory, currentListCategory)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(compilations) && (
                                                    <ListToggleButton
                                                        toggleList={() => setCurrentListCategory(compilationsCategory)}
                                                        text="Compilations"
                                                        isActive={isMatch(compilationsCategory, currentListCategory)}
                                                    />
                                                )
                                            }
                                        </>
                                    }
                                />
                            }
                            list={listToDisplay}
                            renderItem={
                                ((item, index) => {
                                    const { id, name, release_date, images, album_group = "", album_type = "" } = item;

                                    return <Tile
                                        id={id}
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={`${index === 0 && isLatestReleased(item)
                                            ? replaceReleaseDateIfCurrentYear(item).release_date
                                            : getYear(release_date)}
                                ${capitalizeFirstLetter(album_group) || capitalizeFirstLetter(album_type)}
                            `}
                                    />
                                })
                            }
                            hideRestListPart
                            extraContentText="Show all"
                            extraContentAction={() => setListView(listView)}
                            navigateTo={toArtist({
                                id: id, additionalPath: listView.param
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
                            extraContentAction={
                                () => dispatch(setList({ title: "Fans also like", list: relatedArtists, isArtistsList: true }))
                            }
                            navigateTo={() => navigate(toListPage())}
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
                            extraContentAction={
                                () => dispatch(setList({ title: "Appears on", list: appearsOn }))
                            }
                            navigateTo={() => navigate(toListPage())}
                        />
                    </>
            }
        </>
    );
};