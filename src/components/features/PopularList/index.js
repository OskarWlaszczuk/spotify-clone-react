import { useSelector } from "react-redux";
import { Main } from "../../common/Main";
import { TilesList } from "../../common/TilesList";
import { artistsList } from "../../common/TilesList/artists";
import { selectPopularListTitle } from "../../../slices/popularListSlice";

export const PopularList = () => {
    const popularListTitle = useSelector(selectPopularListTitle);

    return (
        <>
            <Main
                content={
                    <TilesList
                        title={popularListTitle}
                        list={artistsList}
                        artistsList
                    />
                }
            />
        </>
    );
};