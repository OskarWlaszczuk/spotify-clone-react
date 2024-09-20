// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchArtist, selectArtist, selectArtistFetchStatus } from "../../../../slices/artistSlice";
// import { loading, success } from "../../../../fetchStatuses";
// import { Banner } from "../../../common/Banner";
// import { Main } from "../../../common/Main";
// import { fetchArtistTopTracks } from "../../../../slices/artistTopTracksSlice";
// import { Table } from "../../../common/Table";
// import { TilesList } from "../../../common/TilesList";
// import { actions, selectors } from "../../../../slices/artistAlbumsSlice";
// import { Tile } from "../../../common/Tile";
// import { fetchArtistRelatedArtists, selectArtistRelatedArtists, selectArtistRelatedArtistsFetchStatus } from "../../../../slices/artistRelatedArtistsSlice";
// import { toArtist } from "../../../../routes";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { artistDetailsActions, artistDetailsSelectors } from "../artistDetails/artistDetailsSlice";
import { useEffect } from "react";
import { artistAlbumsSelectors, artistAlbumsActions } from "../albums/artistAlbumsSlice";
import { relatedArtistsActions, relatedArtistsSelectors } from "../relatedArtists/relatedArtistsSlice";
import { artistTopTracksActions, artistTopTracksSelectors } from "../topTracks/artistTopTracksSlice";

export const ArtistDetailsPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch()

    const { fetch: fetchArtistDetails, clear: clearArtistDetails } = artistDetailsActions;
    const { fetch: fetchArtistAlbums, clear: clearArtistAlbums } = artistAlbumsActions;
    const { fetch: fetchRelatedArtists, clear: clearRelatedArtists } = relatedArtistsActions;
    const { fetch: fetchTopTracks, clear: clearTopTracks } = artistTopTracksActions;

    const details = useSelector(artistDetailsSelectors.selectDatas)?.datas;
    const detailsStatus = useSelector(artistDetailsSelectors.selectStatus);

    const albums = useSelector(artistAlbumsSelectors.selectDatas)?.datas;
    const albumsStatus = useSelector(artistAlbumsSelectors.selectStatus);

    const relatedArtists = useSelector(relatedArtistsSelectors.selectDatas)?.datas.artists;
    const relatedArtistsStatus = useSelector(relatedArtistsSelectors.selectStatus);

    const topTracks = useSelector(artistTopTracksSelectors.selectDatas)?.datas.tracks;
    const topTracksStatus = useSelector(artistTopTracksSelectors.selectStatus)

    const name = details?.name;
    const followers = details?.followers;
    const images = details?.images;

    console.log(topTracks,topTracksStatus);

    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // console.log(id)
    // const artist = useSelector(selectArtist);
    // const fetchArtistStatus = useSelector(selectArtistFetchStatus);

    // const artistAlbums = useSelector(selectors.selectDatas);
    // const fetchArtistAlbumsStatus = useSelector(selectors.selectStatus);

    // const artistRelatedArtists = useSelector(selectArtistRelatedArtists);
    // const fetchArtistRelatedArtistsStatus = useSelector(selectArtistRelatedArtistsFetchStatus);

    // const isLoading = fetchArtistStatus === loading || fetchArtistRelatedArtistsStatus === loading;
    // const isSuccess = fetchArtistStatus === success
    //     && fetchArtistRelatedArtistsStatus === success;

    useEffect(() => {
        const fetchDelayId = setTimeout(() => {
            dispatch(fetchArtistDetails({ id }));
            dispatch(fetchArtistAlbums({ id }));
            dispatch(fetchRelatedArtists({ id }));
            dispatch(fetchTopTracks({ id }));
        }, 500);

        return () => {
            clearTimeout(fetchDelayId);

            clearArtistDetails();
            clearArtistAlbums();
            clearRelatedArtists();
            clearTopTracks()
        };
    }, [
        dispatch,
        fetchArtistDetails,
        fetchArtistAlbums,
        fetchRelatedArtists,
        fetchTopTracks,
        clearArtistDetails,
        clearRelatedArtists,
        clearArtistAlbums,
        clearTopTracks,
        id,
    ]);

    return (
        <>

        </>
    );
};


// {
//     isLoading ?
//         <>Ładowanie</> :
//         isSuccess ?
//             <>
//                 <Main
//                     gradientAvailable
//                     banner={
//                         <Banner
//                             picture={images ? images[0]?.url : ''}
//                             title={name}
//                             caption="Verified artist"
//                             metaDatas={`${followers?.total?.toLocaleString()} followers`}
//                         />
//                     }
//                     content={
//                         <>
//                             <Table />
//                             {/* <TilesList
//                                 title="Albums"
//                                 list={artistAlbums?.items}
//                                 renderItem={
//                                     (({ images, name, release_date, type, id }) => (
//                                         <Tile
//                                             contentAvailable={fetchArtistAlbumsStatus === success}
//                                             id={id}
//                                             picture={images[0].url}
//                                             title={name}
//                                             subInfo={`${release_date} ${type}`}
//                                         />
//                                     ))
//                                 }
//                                 hideRestListPart
//                                 artistsList
//                                 extraContentText="Discography"
//                             // extraContentLink={() => toPopularList(navigate, {
//                             //     state: {
//                             //         title: "Popular artists",
//                             //         list: artists,
//                             //         isArtistsList: true,
//                             //     }
//                             // }
//                             // )}
//                             /> */}

//                             <TilesList
//                                 title="Related artists"
//                                 list={artistRelatedArtists.artists}
//                                 renderItem={({ images, name, type, id }) => (
//                                     <Tile
//                                         id={id}
//                                         picture={images[0].url}
//                                         title={name}
//                                         subInfo={type}
//                                         useArtistPictureStyle
//                                         navigateTo={() => navigate(toArtist({ id }))}
//                                     />
//                                 )}
//                                 hideRestListPart
//                                 artistsList
//                                 extraContentText="Show more"
//                             // extraContentLink={() => toPopularList(navigate, {
//                             //     state: {
//                             //         title: "Popular artists",
//                             //         list: artists,
//                             //         isArtistsList: true,
//                             //     }
//                             // })}
//                             />
//                         </>
//                     }
//                 />
//             </> :
//             <></>
// }