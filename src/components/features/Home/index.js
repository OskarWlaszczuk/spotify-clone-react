import { useEffect } from "react";
import { toPopularList } from "../../../routes";
import { Main } from "../../common/Main"
import { TilesList } from "../../common/TilesList";
import { fetchArtists, selectArtists, selectArtistsFetchStatus } from "../../../slices/artistsSlice";
import { useDispatch, useSelector } from "react-redux";
import { loading, success } from "../../../fetchStatuses";
import { Tile } from "../../common/Tile";
import { useNavigate } from "react-router-dom";
import { fetchAlbums, selectAlbums, selectAlbumsFetchStatus } from "../../../slices/albumsSlice";

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const artistsFetchStatus = useSelector(selectArtistsFetchStatus);
    const albumsFetchStatus = useSelector(selectAlbumsFetchStatus);

    const { artists } = useSelector(selectArtists);
    const { albums } = useSelector(selectAlbums);

    const isLoading = artistsFetchStatus === loading || albumsFetchStatus === loading;
    const isSucces = artistsFetchStatus === success && albumsFetchStatus === success;

    useEffect(() => {
        const fetchDelayId = setTimeout(() => {
            dispatch(fetchArtists());
            dispatch(fetchAlbums());
        }, 500);

        return () => clearTimeout(fetchDelayId);
    }, [dispatch])

    return (
        <Main
            content={
                isLoading ?
                    <>Ładowanie...</> :
                    <>
                        <TilesList
                            title="Popular albums"
                            list={albums}
                            renderItem={
                                (({ images, name, artists }) => (
                                    <Tile
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={artists.map(({ name }) => name).join(",")}
                                    />
                                ))
                            }
                            hideRestListPart
                            extraContentText="Show more"
                            extraContentLink={() => toPopularList(navigate, {
                                state: {
                                    title: "Popular albums",
                                    list: albums,
                                    isArtistsList: false,
                                }
                            })}
                        />
                        <TilesList
                            title="Popular artists"
                            list={artists}
                            renderItem={({ images, name, type }) => (
                                <Tile
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type}
                                    useArtistPictureStyle
                                />
                            )}
                            hideRestListPart
                            artistsList
                            extraContentText="Show more"
                            extraContentLink={() => toPopularList(navigate, {
                                state: {
                                    title: "Popular artists",
                                    list: artists,
                                    isArtistsList: true,
                                }
                            })}
                        />
                    </>
            }
        />
    );
};