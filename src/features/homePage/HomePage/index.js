import { useEffect } from "react";
import { Main } from "../../../common/components/Main";
import { useDispatch, useSelector } from "react-redux";
import { error, initial, loading, success } from "../../../common/constants/fetchStatuses";
import { albumsSelectors, albumsActions } from "../albums/albumsSlice";
import { artistsSelectors, artistsActions } from "../artists/artistsSlice";
import { checkFetchStatuses } from "../../../common/functions/checkFetchStatuses";
import { TilesList } from "../../../common/components/TilesList";
import { Tile } from "../../../common/components/Tile";
import { useNavigate } from "react-router-dom";
import { toArtist, toListPage } from "../../../common/functions/routes";
import { areAllDatasExists } from "../../../common/functions/areAllDatasExists";
import { setList } from "../../ListPage/listSlice";

export const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { fetch: fetchAlbums, clear: clearAlbums } = albumsActions;
    const { fetch: fetchArtists, clear: clearArtists } = artistsActions;

    const albumsStatus = useSelector(albumsSelectors.selectStatus);
    const artistsStatus = useSelector(artistsSelectors.selectStatus);

    const albums = useSelector(albumsSelectors.selectDatas)?.datas.albums;
    const artists = useSelector(artistsSelectors.selectDatas)?.datas.artists;

    const isInitial = checkFetchStatuses([albumsStatus, artistsStatus], initial);
    const isLoading = checkFetchStatuses([albumsStatus, artistsStatus], loading);
    const isError = checkFetchStatuses([albumsStatus, artistsStatus], error);
    const isSucces = checkFetchStatuses([albumsStatus, artistsStatus], success, true) && areAllDatasExists([albums, artists]);

    useEffect(() => {

        const fetchDelayID = setTimeout(() => {
            dispatch(fetchAlbums());
            dispatch(fetchArtists());
        }, 1000);

        return () => {
            clearTimeout(fetchDelayID);
            clearAlbums();
            clearArtists();
        };

    }, [dispatch, fetchAlbums, fetchArtists, clearAlbums, clearArtists]);

    if (isLoading) return <Main content={<>loading</>} />;
    if (isError) return <Main content={<>error</>} />;
    if (isInitial) return <Main content={<>Initial</>} />;

    if (isSucces) {
        return (
            <Main
                gradientAvailable
                content={
                    <>
                        <TilesList
                            title="Popular albums"
                            list={albums}
                            renderItem={({ images, name, artists, id }) => (
                                <Tile
                                    key={id}
                                    id={id}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={artists.map(({ name }) => name).join(",")}
                                />
                            )}
                            hideRestListPart
                            extraContentText="Show more"
                            extraContentAction={() => dispatch(setList(
                                { title: "Popular albums", list: albums, isArtistsList: false }
                            ))}
                            extraContentLink={() => navigate(toListPage())}
                        />
                        <TilesList
                            title="Popular artists"
                            list={artists}
                            renderItem={({ images, name, type, id }) => (
                                <Tile
                                    key={id}
                                    id={id}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type}
                                    useArtistPictureStyle
                                    navigateTo={() => navigate(toArtist({ id: id }))}
                                />
                            )}
                            hideRestListPart
                            artistsList
                            extraContentText="Show more"
                            extraContentAction={() => dispatch(setList({ title: "Popular artists", list: artists, isArtistsList: true }))}
                            extraContentLink={() => navigate(toListPage())}
                        />
                    </>
                }
            />
        );
    };
};
