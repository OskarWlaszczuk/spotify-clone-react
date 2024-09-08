import { useEffect } from "react";
import { toPopularList } from "../../../routes";
import { useNavigationToPage } from "../../../useNavigationToPage";
import { Main } from "../../common/Main"
import { TilesList } from "../../common/TilesList";
import { artistsList } from "../../common/TilesList/artists";
import { fetchArtists, selectArtists, selectArtistsState, selectArtistsFetchStatus } from "../../../slices/artistsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessToken } from "../../../fetchAccessToken";
import { success } from "../../../fetchStatuses";

export const Home = () => {
    const navigateToPage = useNavigationToPage();
    const dispatch = useDispatch();
    const artistsFetchStatus = useSelector(selectArtistsFetchStatus);
    const artists = useSelector(selectArtists);

    console.log(artistsFetchStatus, artists);

    if (artistsFetchStatus === success) {
        console.log(artists)
    }

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch])

    return (
        <Main
            content={
                <>
                    <TilesList
                        toPopularList={() => navigateToPage(toPopularList)}
                        header="Popular artists"
                        list={artistsList}
                        hideRestListPart
                        artistsList
                    />
                    <TilesList
                        toPopularList={() => navigateToPage(toPopularList)}
                        header="Popular albums"
                        list={artistsList}
                        hideRestListPart
                    />
                    <TilesList
                        toPopularList={() => navigateToPage(toPopularList)}
                        header="Popular albums"
                        list={artistsList}
                        hideRestListPart
                    />
                    <TilesList
                        toPopularList={() => navigateToPage(toPopularList)}
                        header="Popular albums"
                        list={artistsList}
                        hideRestListPart
                    />
                    <TilesList
                        toPopularList={() => navigateToPage(toPopularList)}
                        header="Popular albums"
                        list={artistsList}
                        hideRestListPart
                    />
                    <TilesList
                        toPopularList={() => navigateToPage(toPopularList)}
                        header="Popular albums"
                        list={artistsList}
                        hideRestListPart
                    />
                </>
            }
        />
    );
};