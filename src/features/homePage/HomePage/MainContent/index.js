import { useParams } from "react-router-dom"
import { TilesList } from "../../../../common/components/TilesList"
import { useSelector } from "react-redux";
import { Tile } from "../../../../common/components/Tile";
import { albumsSelectors } from "../../../homePage/albums/albumsSlice";
import { artistsSelectors } from "../../artists/artistsSlice";
import { toHome, toArtist, toAlbum } from "../../../../common/functions/routes.js";
import { matchFullListDataByType } from "../../../../common/functions/matchFullListDataByType.js";
import { nanoid } from "nanoid";

export const MainContent = () => {
    const { type } = useParams();

    const popularAlbums = useSelector(albumsSelectors.selectDatas)?.datas.albums;
    const popularArtists = useSelector(artistsSelectors.selectDatas)?.datas.artists;

    const popularAlbumsParam = "popular-albums";
    const popularArtistsParam = "popular-artists";

    const { fullListContent, fullListTitle, isFullListArtistsList } = matchFullListDataByType([
        { key: popularAlbumsParam, value: popularAlbums, title: "Popular albums", isArtistsList: false },
        { key: popularArtistsParam, value: popularArtists, title: "Popular artists", isArtistsList: true },
    ], type)

    return (
        <>
            {
                type ?
                    <TilesList
                        title={fullListTitle}
                        list={fullListContent}
                        renderItem={
                            (({ id, name, images, album_type = "" }) => (
                                <Tile
                                    key={nanoid()}
                                    toPage={toArtist({ id: id })}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={album_type}
                                    isArtistPictureStyle={isFullListArtistsList}
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
                                (({ id, images, name, artists }) => (
                                    <Tile
                                        key={nanoid()}
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={artists.map(({ name }) => name).join(",")}
                                        toPage={toAlbum()}
                                    />
                                ))
                            }
                            hideRestListPart
                            fullListPathname={toHome({ additionalPath: popularAlbumsParam })}
                        />

                        <TilesList
                            title="Popular artists"
                            list={popularArtists}
                            renderItem={({ images, name, type, id }) => (
                                <Tile
                                    key={nanoid()}
                                    picture={images[0].url}
                                    title={name}
                                    subInfo={type}
                                    isArtistPictureStyle
                                    toPage={toArtist({ id })}
                                />
                            )}
                            hideRestListPart
                            fullListPathname={toHome({ additionalPath: popularArtistsParam })}
                        />
                    </>
            }
        </>
    )
}