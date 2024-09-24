import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { artistDetailsActions, artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { useEffect } from "react";
import { artistAlbumsSelectors, artistAlbumsActions } from "../../slices/artistAlbumsSlice";
import { relatedArtistsActions, relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksActions, artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
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
import { useFetchStatuses } from "../../../../common/hooks/useFetchStatuses";

export const ArtistDetailsPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate();

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

    const { matchedGroup, currentGroupType, setCurrentGroupType } = useCurrentGroupType(popularReleasesGroup, {
        albums, singles, compilations, sortedPopularReleasesWithNewestFirst
    });

    const { isInitial, isLoading, isSucces, isError } = useFetchStatuses(
        [detailsStatus, albumsStatus, relatedArtistsStatus, topTracksStatus, singlesStatus, compilationsStatus],
        [details, albums, relatedArtists, topTracks, singles, compilations],
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

    const groupToDisplay = removeDuplicates(matchedGroup.group);

    if (isLoading) return <Main content={<>loading</>} />;
    if (isError) return <Main content={<>error</>} />;
    if (isInitial) return <Main content={<>Initial</>} />;
    if (isSucces)
        return (
            <Main
                gradientAvailable
                banner={
                    <Banner
                        picture={details.images ? details.images[0]?.url : ''}
                        title={details.name}
                        caption="Verified artist"
                        metaDatas={`${details.followers?.total?.toLocaleString()} followers`}
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
                                                        toggleList={() => setCurrentGroupType(popularReleasesGroup)}
                                                        text="Popular releases"
                                                        isActive={isAlbumGroupMatch(popularReleasesGroup, currentGroupType)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(albums) && (
                                                    <ListToggleButton
                                                        toggleList={() => setCurrentGroupType(albumsGroup)}
                                                        text="Albums"
                                                        isActive={isAlbumGroupMatch(albumsGroup, currentGroupType)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(singles) && (
                                                    <ListToggleButton
                                                        toggleList={() => setCurrentGroupType(singlesGroup)}
                                                        text="Singles"
                                                        isActive={isAlbumGroupMatch(singlesGroup, currentGroupType)}
                                                    />
                                                )
                                            }
                                            {
                                                isListEmpty(compilations) && (
                                                    <ListToggleButton
                                                        toggleList={() => setCurrentGroupType(compilationsGroup)}
                                                        text="Compilations"
                                                        isActive={isAlbumGroupMatch(compilationsGroup, currentGroupType)}
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
                                    setList({ title: matchedGroup.title, list: groupToDisplay, isArtistsList: false })
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