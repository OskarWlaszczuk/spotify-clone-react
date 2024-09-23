import { useSelector } from "react-redux";
import { Main } from "../../common/components/Main";
import { Tile } from "../../common/components/Tile";
import { TilesList } from "../../common/components/TilesList";
import { selectListStates } from "./listSlice";
import { useNavigate } from "react-router-dom";
import { toAlbum, toArtist } from "../../common/functions/routes";

export const ListPage = () => {
    const { title, list, isArtistsList, navigationID } = useSelector(selectListStates);

    const navigate = useNavigate();
    // console.log(title, list, isArtistsList)
    return (
        <>
            <Main
                content={
                    <TilesList
                        title={title}
                        list={list}
                        artistsList={isArtistsList}
                        renderItem={({ id, images, name, type, artists }) => (
                            <Tile
                                id={id}
                                picture={images[0].url}
                                title={name}
                                subInfo={isArtistsList ? type : artists.map(({ name }) => name).join(",")}
                                useArtistPictureStyle={isArtistsList}
                                navigateTo={() => navigate(isArtistsList ? toArtist({ id }) : toAlbum({ id}))}
                            />
                        )}
                    />
                }
            />
        </>
    );
};