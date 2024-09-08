import { Main } from "../../common/Main";
import { TilesList } from "../../common/TilesList";
import { artistsList } from "../../common/TilesList/artists";

export const PopularList = () => {

    return (
        <>
            <Main
                content={
                    <TilesList
                        header="Popular artists"
                        list={artistsList}
                        artistsList
                    />
                }
            />
        </>
    );
};