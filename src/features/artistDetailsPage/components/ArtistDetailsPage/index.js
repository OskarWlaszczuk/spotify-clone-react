import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { artistDetailsActions, artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { useEffect, useState } from "react";
import { artistAlbumsSelectors, artistAlbumsActions } from "../../slices/artistAlbumsSlice";
import { relatedArtistsActions, relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksActions, artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { checkFetchStatuses } from "../../../../common/functions/checkFetchStatuses";
import { error, initial, loading, success } from "../../../../common/constants/fetchStatuses";
import { Main } from "../../../../common/components/Main";
import { TilesList } from "../../../../common/components/TilesList";
import { Tile } from "../../../../common/components/Tile";
import { Banner } from "../../../../common/components/Banner";
import { Table } from "../../../../common/components/Table";
import { toArtist, toListPage } from "../../../../common/functions/routes";
import { ListToggleButton } from "../../../../common/components/ListToggleButton";
import { ItemsList } from "../../../../common/components/ItemsList";
import { artistSinglesActions, artistSinglesSelectors } from "../../slices/artistSinglesSlice";
import { artistCompilationActions, artistCompilationSelectors } from "../../slices/artistCompilationSlice";
import { areAllDatasExists } from "../../../../common/functions/areAllDatasExists";
import { getYear } from "../../../../common/functions/getYear";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { setList } from "../../../ListPage/listSlice";
import { removeDuplicates } from "../../functions/removeDuplicates"
import { replaceReleaseDateIfCurrentYear } from "../../functions/replaceReleaseDateIfCurrentYear";
import { isLatestReleased } from "../../functions/isLatestReleased";
import { isListEmpty } from "../../functions/isListEmpty";
import { useAlbumTypeGroup } from "../../hooks/useAlbumTypeGroup";

export const ArtistDetailsPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const popularReleasesGroup = "popularReleases";
    const albumsGroup = "albums";
    const singlesGroup = "singles";
    const compilationsGroup = "compilations";

    const { albumTypeGroup, setAlbumTypeGroup } = useAlbumTypeGroup(popularReleasesGroup);

    const { fetch: fetchArtistDetails, clear: clearArtistDetails } = artistDetailsActions;
    const { fetch: fetchArtistAlbums, clear: clearArtistAlbums } = artistAlbumsActions;
    const { fetch: fetchRelatedArtists, clear: clearRelatedArtists } = relatedArtistsActions;
    const { fetch: fetchTopTracks, clear: clearTopTracks } = artistTopTracksActions;
    const { fetch: fetchArtistSingles, clear: clearArtistSingles } = artistSinglesActions;
    const { fetch: fetchArtistCompilation, clear: clearArtistCompilation } = artistCompilationActions;

    const details = useSelector(artistDetailsSelectors.selectDatas)?.datas;
    const detailsStatus = useSelector(artistDetailsSelectors.selectStatus);

    const albums = useSelector(artistAlbumsSelectors.selectDatas)?.datas.items;
    const albumsStatus = useSelector(artistAlbumsSelectors.selectStatus);

    const compilations = useSelector(artistCompilationSelectors.selectDatas)?.datas.items;
    const compilationsStatus = useSelector(artistCompilationSelectors.selectStatus);

    const singles = useSelector(artistSinglesSelectors.selectDatas)?.datas.items;
    const singlesStatus = useSelector(artistSinglesSelectors.selectStatus);

    const relatedArtists = useSelector(relatedArtistsSelectors.selectDatas)?.datas.artists;
    const relatedArtistsStatus = useSelector(relatedArtistsSelectors.selectStatus);

    const topTracks = useSelector(artistTopTracksSelectors.selectDatas)?.datas.tracks;
    const topTracksStatus = useSelector(artistTopTracksSelectors.selectStatus)

    const popularReleases = topTracks?.map(({ album }) => album);
    const newestPopularRelease = popularReleases?.slice().sort(
        (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date))
    )[0];

    const sortedPopularReleasesWithNewestFirst = [
        { ...(newestPopularRelease ?? {}) },
        ...(popularReleases?.slice() ?? []),
    ];

    const name = details?.name;
    const followers = details?.followers;
    const images = details?.images;

    const isInitial = checkFetchStatuses(
        [
            detailsStatus,
            albumsStatus,
            relatedArtistsStatus,
            topTracksStatus,
            singlesStatus,
            compilationsStatus
        ],
        initial
    );
    const isLoading = checkFetchStatuses(
        [
            detailsStatus,
            albumsStatus,
            relatedArtistsStatus,
            topTracksStatus,
            singlesStatus,
            compilationsStatus
        ], loading
    );
    const isError = checkFetchStatuses(
        [
            detailsStatus,
            albumsStatus,
            relatedArtistsStatus,
            topTracksStatus,
            singlesStatus,
            compilationsStatus
        ], error
    );
    const isSucces = (
        checkFetchStatuses(
            [
                detailsStatus,
                albumsStatus,
                relatedArtistsStatus,
                topTracksStatus,
                singlesStatus,
                compilationsStatus
            ], success, true
        )
        && areAllDatasExists([details, albums, relatedArtists, topTracks, singles, compilations])
    );

    useEffect(() => {
        const fetchDelayId = setTimeout(() => {
            dispatch(fetchArtistDetails({ id }));
            dispatch(fetchRelatedArtists({ id }));
            dispatch(fetchTopTracks({ id }));
            dispatch(fetchArtistAlbums({ id }));
            dispatch(fetchArtistSingles({ id }));
            dispatch(fetchArtistCompilation({ id }));
        }, 500);

        return () => {
            clearTimeout(fetchDelayId);

            clearArtistDetails();
            clearArtistAlbums();
            clearRelatedArtists();
            clearTopTracks();
            clearArtistCompilation();
            clearArtistSingles();
        };
    }, [
        dispatch,
        fetchArtistDetails,
        fetchArtistAlbums,
        fetchRelatedArtists,
        fetchArtistSingles,
        fetchArtistCompilation,
        fetchTopTracks,
        clearArtistDetails,
        clearRelatedArtists,
        clearArtistAlbums,
        clearTopTracks,
        clearArtistSingles,
        clearArtistCompilation,
        id,
    ]);

    const isAlbumGroupMatch = group => albumTypeGroup === group;

    const findMatchingGroup = () => {
        if (isAlbumGroupMatch(albumsGroup)) return { group: albums, title: "Albums" };
        if (isAlbumGroupMatch(singlesGroup)) return { group: singles, title: "Singles" };
        if (isAlbumGroupMatch(compilationsGroup)) return { group: compilations, title: "Compilations" };
        if (isAlbumGroupMatch(popularReleasesGroup)) return { group: sortedPopularReleasesWithNewestFirst, title: "Popular releases" };
    };

    const listToDisplay = removeDuplicates(findMatchingGroup().group);

    if (isLoading) return <Main content={<>loading</>} />;
    if (isError) return <Main content={<>error</>} />;
    if (isInitial) return <Main content={<>Initial</>} />;
    if (isSucces)
        return (
            <Main
                gradientAvailable
                banner={
                    <Banner
                        picture={images ? images[0]?.url : ''}
                        title={name}
                        caption="Verified artist"
                        metaDatas={`${followers?.total?.toLocaleString()} followers`}
                    />
                }
                content={
                    <>
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
                                                        toggleList={() => setAlbumTypeGroup(popularReleasesGroup)}
                                                        text="Popular releases"
                                                        isActive={isAlbumGroupMatch(popularReleasesGroup)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(albums) && (
                                                    <ListToggleButton
                                                        toggleList={() => setAlbumTypeGroup(albumsGroup)}
                                                        text="Albums"
                                                        isActive={isAlbumGroupMatch(albumsGroup)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(singles) && (
                                                    <ListToggleButton
                                                        toggleList={() => setAlbumTypeGroup(singlesGroup)}
                                                        text="Singles"
                                                        isActive={isAlbumGroupMatch(singlesGroup)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(compilations) && (
                                                    <ListToggleButton
                                                        toggleList={() => setAlbumTypeGroup(compilationsGroup)}
                                                        text="Compilations"
                                                        isActive={isAlbumGroupMatch(compilationsGroup)}
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
                                        subInfo={`
                                            ${index === 0 && isLatestReleased(item)
                                                ? replaceReleaseDateIfCurrentYear(item).release_date
                                                : getYear(release_date)
                                            }
                                            ${capitalizeFirstLetter(album_group) || capitalizeFirstLetter(album_type)}
                                        `}
                                    />
                                })
                            }
                            hideRestListPart
                            artistsList
                            extraContentText="Show all"
                            extraContentAction={
                                () => dispatch(
                                    setList({ title: findMatchingGroup().title, list: listToDisplay, isArtistsList: false })
                                )
                            }
                            extraContentLink={() => navigate(toListPage())}
                        />
                        <TilesList
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
                                    navigateTo={() => navigate(toArtist({ id }))}
                                />
                            )}
                            hideRestListPart
                            artistsList
                            extraContentText="Show all"
                            extraContentAction={
                                () => dispatch(setList({ title: "Fans also like", list: relatedArtists, isArtistsList: true }))
                            }
                            extraContentLink={() => navigate(toListPage())}
                        />
                    </>
                }
            />
        )
};