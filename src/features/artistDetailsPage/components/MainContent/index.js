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
import { useCurrentGroupType } from "../../hooks/useCurrentGroupType";
import { popularReleasesGroup, albumsGroup, singlesGroup, compilationsGroup } from "../../constants/groups";
import { isAlbumGroupMatch } from "../../functions/isAlbumGroupMatch";
import { artistAppearsOnSelectors } from "../../slices/artistAppearsOnSlice";
import { ListView } from "../../../../common/components/ListView";
import { useState } from "react";
import { artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { Banner } from "../../../../common/components/Banner";
import { ContentWrapper } from "../../../../common/components/ContentWrapper";

export const MainContent = () => {
    const { id, type } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate();

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


    const mergedArray = [
        ...albums,
        ...compilations,
        ...singles,
        ...sortedPopularReleasesWithNewestFirst,
    ];

    const { matchedGroup, currentGroupType, setCurrentGroupType } = useCurrentGroupType(popularReleasesGroup, {
        albums, singles, compilations, sortedPopularReleasesWithNewestFirst
    });

    const allParamGroup = "/all";
    const albumsParamGroup = "/album";
    const singleParamGroup = "/single";
    const compilationParamGroup = "/compilation";

    const isMatch = (group, targetGroup) => group === targetGroup;
    const isParamMatch = param => param === type;

    const findMatchingGroup = () => {

        if (isMatch(popularReleasesGroup, currentGroupType))
            return { group: mergedArray, param: allParamGroup };

        if (isMatch(albumsGroup, currentGroupType))
            return { group: albums, param: albumsParamGroup };

        if (isMatch(compilationsGroup, currentGroupType))
            return { group: compilations, param: compilationParamGroup };

        if (isMatch(singlesGroup, currentGroupType))
            return { group: singles, param: singleParamGroup };
    };


    const matchListToParam = () => {

        if (isParamMatch(allParamGroup))
            return mergedArray;

        if (isMatch(albumsParamGroup))
            return albums;

        if (isMatch(compilationParamGroup))
            return compilations;

        if (isMatch(singleParamGroup))
            return singles;
    };

    const [listView, setListView] = useState(matchListToParam() || null);
    const [currentListViewParam, setCurrentListViewType] = useState(findMatchingGroup().param || null);

    // const [isListView, setIsListView] = useState(false);

    const groupToDisplay = removeDuplicates(matchedGroup.group);
    console.log(currentGroupType);
    return (
        <>
            {
                type ?
                    <TilesList
                        title={name}
                        list={removeDuplicates(listView)}
                        renderItem={
                            ((item, index) => {
                                const { id, name, release_date, images, album_group = "", album_type = "" } = item;

                                return <Tile
                                    id={id}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={album_group}
                                />
                            })
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
                                                        toggleList={() => setCurrentGroupType(popularReleasesGroup)}
                                                        text="Popular releases"
                                                        isActive={isMatch(popularReleasesGroup, currentGroupType)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(albums) && (
                                                    <ListToggleButton
                                                        toggleList={() => setCurrentGroupType(albumsGroup)}
                                                        text="Albums"
                                                        isActive={isMatch(albumsGroup, currentGroupType)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(singles) && (
                                                    <ListToggleButton
                                                        toggleList={() => setCurrentGroupType(singlesGroup)}
                                                        text="Singles"
                                                        isActive={isMatch(singlesGroup, currentGroupType)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(compilations) && (
                                                    <ListToggleButton
                                                        toggleList={() => setCurrentGroupType(compilationsGroup)}
                                                        text="Compilations"
                                                        isActive={isMatch(compilationsGroup, currentGroupType)}
                                                    />
                                                )
                                            }
                                        </>
                                    }
                                />
                            }
                            list={groupToDisplay}
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
                            extraContentAction={() => {
                                setListView(findMatchingGroup().group);
                                setCurrentListViewType(matchListToParam())
                            }}
                            navigateTo={toArtist({
                                id: id, additionalPath: findMatchingGroup().param
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