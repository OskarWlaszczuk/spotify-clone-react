import { useParams } from "react-router-dom"
import { TilesList } from "../../../../common/components/TilesList"
import { useSelector } from "react-redux";
import { Tile } from "../../../../common/components/Tile";
import { albumsSelectors } from "../../../homePage/albums/albumsSlice";
import { artistsSelectors } from "../../artists/artistsSlice";
import { popularAlbumsParam, popularArtistsParam } from "../../constants/params";
import { toHome, toArtist } from "../../../../common/functions/routes.js";
import { selectDataView } from "../../../../common/functions/selectDataView.js";

export const MainContent = () => {
    const { type } = useParams();

    const popularAlbums = useSelector(albumsSelectors.selectDatas)?.datas.albums;
    const popularArtists = useSelector(artistsSelectors.selectDatas)?.datas.artists;

    const { selectedList, selectedTitle, isArtistsList } = selectDataView([
        { key: popularAlbumsParam, value: popularAlbums, title: "Popular albums", isArtistsList: false },
        { key: popularArtistsParam, value: popularArtists, title: "Popular artists", isArtistsList: true },
    ], type)

    return (
        <>
            {
                type ?
                    <TilesList
                        title={selectedTitle}
                        list={selectedList}
                        renderItem={
                            (({ id, name, images, album_type = "" }) => (
                                <Tile
                                    navigateTo={toArtist({ id: id })}
                                    id={id}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={album_type}
                                    useArtistPictureStyle={isArtistsList}
                                />
                            ))
                        }
                    />
                    :
                    <>
                        <TilesList
                            title="Popular albums"
                            list={popularAlbums}
                            renderItem={
                                (({ images, name, artists, id }) => (
                                    <Tile
                                        id={id}
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={artists.map(({ name }) => name).join(",")}
                                    />
                                ))
                            }
                            hideRestListPart
                            titleExtraAsideContent={
                                {
                                    link: toHome({ additionalPath: popularAlbumsParam }),
                                    text: "Show more",
                                }
                            }
                        />

                        <TilesList
                            title="Popular artists"
                            list={popularArtists}
                            renderItem={({ images, name, type, id }) => (
                                <Tile
                                    id={id}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type}
                                    useArtistPictureStyle
                                    navigateTo={toArtist({ id })}
                                />
                            )}
                            hideRestListPart
                            artistsList
                            titleExtraAsideContent={
                                {
                                    link: toHome({ additionalPath: popularArtistsParam }),
                                    text: "Show more",
                                }
                            }
                        />
                    </>
            }
        </>
    )
}