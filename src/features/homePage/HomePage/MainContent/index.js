// import { useNavigate } from "react-router-dom"
// import { toArtist, toPopularList } from "../../../../../routes"
// import { TilesList } from "../../../../common/TilesList"
// import { useSelector } from "react-redux";
// import { Tile } from "../../../../common/Tile";
// import { albumsSelectors } from "../../../homePage/albums/albumsSlice";
// import { artistsSelectors } from "../../artists/artistsSlice";

// export const MainContent = () => {
//     const navigate = useNavigate();

//     const albums = useSelector(albumsSelectors.selectDatas)?.datas.albums;
//     const artists = useSelector(artistsSelectors.selectDatas)?.datas.artists;

//     console.log(albums, artists)
//     return (
//         <>
//             {
//                 (albums && artists) && (
//                     <>

//                         <TilesList
//                             title="Popular albums"
//                             list={albums}
//                             renderItem={
//                                 (({ images, name, artists, id }) => (
//                                     <Tile
//                                         id={id}
//                                         picture={images[0].url}
//                                         title={name}
//                                         subInfo={artists.map(({ name }) => name).join(",")}
//                                     />
//                                 ))
//                             }
//                             hideRestListPart
//                             extraContentText="Show more"
//                             extraContentLink={() => toPopularList(navigate, {
//                                 state: {
//                                     title: "Popular albums",
//                                     list: albums,
//                                     isArtistsList: false,
//                                 }
//                             })}
//                         />

//                         <TilesList
//                             title="Popular artists"
//                             list={artists}
//                             renderItem={({ images, name, type, id }) => (
//                                 <Tile
//                                     id={id}
//                                     picture={images[0].url}
//                                     title={name}
//                                     subInfo={type}
//                                     useArtistPictureStyle
//                                     navigateTo={() => navigate(toArtist({ id }))}
//                                 />
//                             )}
//                             hideRestListPart
//                             artistsList
//                             extraContentText="Show more"
//                             extraContentLink={() => toPopularList(navigate, {
//                                 state: {
//                                     title: "Popular artists",
//                                     list: artists,
//                                     isArtistsList: true,
//                                 }
//                             })}
//                         />
//                     </>
//                 )
//             }
//         </>
//     )
// }