import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtist, selectArtist, selectArtistFetchStatus } from "../../../slices/artistSlice";
import { loading, success } from "../../../fetchStatuses";
import { Banner } from "../../common/Banner";
import { Main } from "../../common/Main";
import { fetchArtistTopTracks } from "../../../slices/artistTopTracksSlice";
import { Table } from "../../common/Table";
import { TilesList } from "../../common/TilesList";
import { fetchArtistAlbums, selectArtistAlbums, selectArtistAlbumsFetchStatus } from "../../../slices/artistAlbumsSlice";
import { Tile } from "../../common/Tile";

export const Artist = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const artist = useSelector(selectArtist);
    const fetchArtistStatus = useSelector(selectArtistFetchStatus);

    const artistAlbums = useSelector(selectArtistAlbums);
    const fetchArtistAlbumsStatus = useSelector(selectArtistAlbumsFetchStatus);

    const name = artist?.name;
    const followers = artist?.followers;
    const images = artist?.images;

    useEffect(() => {
        const fetchDelayId = setTimeout(() => {
            dispatch(fetchArtist(id));
            dispatch(fetchArtistTopTracks(id))
            dispatch(fetchArtistAlbums(id));
        }, 500);

        return () => clearTimeout(fetchDelayId);
    }, [dispatch, id]);

    return (
        <>
            {
                fetchArtistStatus === loading || fetchArtistAlbumsStatus === loading  ?
                    <>Ładowanie</> :
                    <>
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
                                        list={artistAlbums?.items}
                                        renderItem={
                                            (({ images, name, release_date, type, id }) => (
                                                <Tile
                                                    contentAvailable={fetchArtistAlbumsStatus === success}
                                                    id={id}
                                                    picture={images[0].url}
                                                    title={name}
                                                    subInfo={`${release_date} ${type}`}
                                                />
                                            ))
                                        }
                                        hideRestListPart
                                        artistsList
                                        extraContentText="Show more"
                                    //     extraContentLink={() => toPopularList(navigate, {
                                    //         state: {
                                    //             title: "Popular artists",
                                    //             list: artists,
                                    //             isArtistsList: true,
                                    //         }
                                    //     }
                                    // )}
                                    />
                                </>
                            }
                        />
                    </>
            }
        </>
    );
};
