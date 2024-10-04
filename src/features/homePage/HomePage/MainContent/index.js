import { useParams } from "react-router-dom"
import { TilesList } from "../../../../common/components/TilesList"
import { useSelector } from "react-redux";
import { Tile } from "../../../../common/components/Tile";
import { albumsSelectors } from "../../../homePage/albums/albumsSlice";
import { artistsSelectors } from "../../artists/artistsSlice";
import { toHome, toArtist, toAlbum } from "../../../../common/functions/routes.js";
import { selectDataView } from "../../../../common/functions/selectDataView.js";
import { titleExtraAsideContentText } from "../../../../common/constants/titleExtraAsideContentText.js";

export const MainContent = () => {
    const { type } = useParams();

    const popularAlbums = useSelector(albumsSelectors.selectDatas)?.datas.albums;
    const popularArtists = useSelector(artistsSelectors.selectDatas)?.datas.artists;

    const popularAlbumsParam = "popular-albums";
    const popularArtistsParam = "popular-artists";

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
                                    toPage={toArtist({ id: id })}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={album_type}
                                    isArtistPictureStyle={isArtistsList}
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
                                (({ images, name, artists }) => (
                                    <Tile
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={artists.map(({ name }) => name).join(",")}
                                        toPage={toAlbum()}
                                    />
                                ))
                            }
                            hideRestListPart
                            titleExtraAsideContent={
                                {
                                    link: toHome({ additionalPath: popularAlbumsParam }),
                                    text: titleExtraAsideContentText,
                                }
                            }
                        />

                        <TilesList
                            title="Popular artists"
                            list={popularArtists}
                            renderItem={({ images, name, type, id }) => (
                                <Tile
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type}
                                    isArtistPictureStyle
                                    toPage={toArtist({ id })}
                                />
                            )}
                            hideRestListPart
                            titleExtraAsideContent={
                                {
                                    link: toHome({ additionalPath: popularArtistsParam }),
                                    text: titleExtraAsideContentText,
                                }
                            }
                        />
                    </>
            }
        </>
    )
}