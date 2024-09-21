import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { artistDetailsActions, artistDetailsSelectors } from "../artistDetails/artistDetailsSlice";
import { useEffect } from "react";
import { artistAlbumsSelectors, artistAlbumsActions } from "../albums/artistAlbumsSlice";
import { relatedArtistsActions, relatedArtistsSelectors } from "../relatedArtists/relatedArtistsSlice";
import { artistTopTracksActions, artistTopTracksSelectors } from "../topTracks/artistTopTracksSlice";
import { checkFetchStatuses } from "../../../common/functions/checkFetchStatuses";
import { error, initial, loading, success } from "../../../common/constants/fetchStatuses";
import { Main } from "../../../common/components/Main";
import { TilesList } from "../../../common/components/TilesList";
import { Tile } from "../../../common/components/Tile";
import { Banner } from "../../../common/components/Banner";
import { Table } from "../../../common/components/Table";
import { toArtist, toPopularList } from "../../../common/functions/routes";
import { artistSinglesActions, artistSinglesSelectors } from "../artistSingles/artistSinglesSlice";

export const ArtistDetailsPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { fetch: fetchArtistDetails, clear: clearArtistDetails } = artistDetailsActions;
    const { fetch: fetchArtistAlbums, clear: clearArtistAlbums } = artistAlbumsActions;
    const { fetch: fetchRelatedArtists, clear: clearRelatedArtists } = relatedArtistsActions;
    const { fetch: fetchTopTracks, clear: clearTopTracks } = artistTopTracksActions;
    const { fetch: fetchArtistSingles, clear: clearArtistSingles } = artistSinglesActions;

    const details = useSelector(artistDetailsSelectors.selectDatas)?.datas;
    const detailsStatus = useSelector(artistDetailsSelectors.selectStatus);

    const albums = useSelector(artistAlbumsSelectors.selectDatas)?.datas.items;
    const albumsStatus = useSelector(artistAlbumsSelectors.selectStatus);

    const relatedArtists = useSelector(relatedArtistsSelectors.selectDatas)?.datas.artists;
    const relatedArtistsStatus = useSelector(relatedArtistsSelectors.selectStatus);

    const topTracks = useSelector(artistTopTracksSelectors.selectDatas)?.datas.tracks;
    const topTracksStatus = useSelector(artistTopTracksSelectors.selectStatus)

    const singles = useSelector(artistSinglesSelectors.selectDatas)?.datas.items;
    const singlesStatus = useSelector(artistSinglesSelectors.selectStatus);

    const name = details?.name;
    const followers = details?.followers;
    const images = details?.images;

    const isInitial = checkFetchStatuses([detailsStatus, albumsStatus, relatedArtistsStatus, topTracksStatus, singlesStatus], initial);
    const isLoading = checkFetchStatuses([detailsStatus, albumsStatus, relatedArtistsStatus, topTracksStatus, singlesStatus], loading);
    const isError = checkFetchStatuses([detailsStatus, albumsStatus, relatedArtistsStatus, topTracksStatus, singlesStatus], error);
    const isSucces = checkFetchStatuses([detailsStatus, albumsStatus, relatedArtistsStatus, topTracksStatus, singlesStatus], success, true)
        && Boolean(details)
        && Boolean(albums)
        && Boolean(relatedArtists)
        && Boolean(topTracks)
        && Boolean(singles);

    useEffect(() => {
        const fetchDelayId = setTimeout(() => {
            dispatch(fetchArtistDetails({ id }));
            dispatch(fetchArtistAlbums({ id }));
            dispatch(fetchRelatedArtists({ id }));
            dispatch(fetchTopTracks({ id }));
            dispatch(fetchArtistSingles({ id }));
        }, 500);

        return () => {
            clearTimeout(fetchDelayId);

            clearArtistDetails();
            clearArtistAlbums();
            clearRelatedArtists();
            clearTopTracks();
            clearArtistSingles();
        };
    }, [
        dispatch,
        fetchArtistDetails,
        fetchArtistAlbums,
        fetchRelatedArtists,
        fetchTopTracks,
        fetchArtistSingles,
        clearArtistDetails,
        clearRelatedArtists,
        clearArtistAlbums,
        clearTopTracks,
        clearArtistSingles,
        id,
    ]);

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
                            title="Albums"
                            list={albums}
                            renderItem={
                                (({ images, name, release_date, type, id }) => (
                                    <Tile
                                        id={id}
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={`${release_date} ${type}`}
                                    />
                                ))
                            }
                            hideRestListPart
                            artistsList
                            extraContentText="Discography"
                            extraContentLink={() => toPopularList(navigate, {
                                state: {
                                    title: "Discography",
                                    list: albums,
                                    isArtistsList: false,
                                }
                            }
                            )}
                        />

                        <TilesList
                            title="Singles"
                            list={singles}
                            renderItem={
                                (({ images, name, release_date, type, id }) => (
                                    <Tile
                                        id={id}
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={`${release_date} ${type}`}
                                    />
                                ))
                            }
                            hideRestListPart
                            artistsList
                            extraContentText="Discography"
                            extraContentLink={() => toPopularList(navigate, {
                                state: {
                                    title: "Discography",
                                    list: singles,
                                    isArtistsList: false,
                                }
                            }
                            )}
                        />

                        <TilesList
                            title="Fans like it too"
                            list={relatedArtists}
                            renderItem={({ images, name, type, id }) => (
                                <Tile
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
                            extraContentText="Show more"
                            extraContentLink={() => toPopularList(navigate, {
                                state: {
                                    title: "Fans like it too",
                                    list: relatedArtists,
                                    isArtistsList: true,
                                }
                            })}
                        />
                    </>
                }
            />
        )
};