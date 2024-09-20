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

export const ArtistDetailsPage = () => {
    // const { id } = useParams();

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

    // const name = artist?.name;
    // const followers = artist?.followers;
    // const images = artist?.images;

    // useEffect(() => {
    //     const fetchDelayId = setTimeout(() => {
    //         dispatch(fetchArtist(id));
    //         dispatch(fetchArtistTopTracks(id));
    //         dispatch(actions.fetch(id));
    //         dispatch(fetchArtistRelatedArtists(id));
    //     }, 500);

    //     return () => {
    //         clearTimeout(fetchDelayId);
    //         actions.clear();
    //     };
    // }, [dispatch, id]);

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