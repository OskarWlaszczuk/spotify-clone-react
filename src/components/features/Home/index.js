import { toPopularList } from "../../../routes";
import { useNavigationToPage } from "../../../useNavigationToPage";
import { Main } from "../../common/Main"
import { TilesList } from "../../common/TilesList";
import { artists } from "../../common/TilesList/artists";

export const Home = () => {
    const navigateToPage = useNavigationToPage();

    return (
        <Main
            content={
                <>
                    <TilesList
                        toPopularList={() => navigateToPage(toPopularList)}
                        header="Popular artists"
                        list={artists}
                        hideRestListPart
                        artistsList
                    />
                    <TilesList
                        toPopularList={() => navigateToPage(toPopularList)}
                        header="Popular albums"
                        list={artists}
                        hideRestListPart
                    />
                </>
            }
        />
    );
};