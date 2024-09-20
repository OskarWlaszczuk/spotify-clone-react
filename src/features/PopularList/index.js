import { Main } from "../../common/components/Main";
import { Tile } from "../../common/components/Tile";
import { TilesList } from "../../common/components/TilesList";
import { useLocation } from "react-router-dom";

export const PopularList = () => {

    const location = useLocation();
    const { title, list, isArtistsList } = location.state;

    return (
        <>
            <Main
                content={
                    <TilesList
                        title={title}
                        list={list}
                        artistsList={isArtistsList}
                        renderItem={({ images, name, type, artists }) => (
                            <Tile
                                picture={images[0].url}
                                title={name}
                                subInfo={isArtistsList ? type : artists.map(({ name }) => name).join(",")}
                                useArtistPictureStyle={isArtistsList}
                            />
                        )}
                    />
                }
            />
        </>
    );
};