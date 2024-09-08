import { useEffect, useRef, useState } from "react";
import { toPopularList } from "../../../routes";
import { useNavigationToPage } from "../../../useNavigationToPage";
import { Main } from "../../common/Main"
import { TilesList } from "../../common/TilesList";
import { artistsList } from "../../common/TilesList/artists";
import { fetchArtists, selectArtists, selectArtistsState, selectArtistsFetchStatus } from "../../../slices/artistsSlice";
import { useDispatch, useSelector } from "react-redux";
import { loading, success } from "../../../fetchStatuses";
import { Tile } from "../../common/Tile";
import { setPopularListTitle } from "../../../slices/popularListSlice";

export const Home = () => {
    const navigateToPage = useNavigationToPage();
    const dispatch = useDispatch();
    const artistsFetchStatus = useSelector(selectArtistsFetchStatus);
    const { artists } = useSelector(selectArtists);


    const [tilesPerRow, setTilesPerRow] = useState(0);
    const containerRef = useRef(null);

    const calculateTilesPerRow = () => {
        const containerWidth = containerRef.current.offsetWidth;
        const tileWidth = 150;

        const effectiveTileWidth = tileWidth + 10;
        const count = Math.floor(containerWidth / effectiveTileWidth);
        setTilesPerRow(count);

    };

    useEffect(() => {
        if (artistsFetchStatus === success) {
            calculateTilesPerRow();
            window.addEventListener('resize', calculateTilesPerRow);
        }

        return () => {
            window.removeEventListener('resize', calculateTilesPerRow);
        };
    }, [artistsFetchStatus]);

    useEffect(() => {
        const fetchDelayId = setTimeout(() => {
            dispatch(fetchArtists());
        }, 1000);

        return () => clearTimeout(fetchDelayId);
    }, [dispatch])

    return (
        <Main
            content={
                artistsFetchStatus === loading ?
                    <>Ładowanie</> :
                    <>
                        <TilesList
                            title="Popular artists"
                            ref={containerRef}
                            listContent={
                                artists.slice(0, tilesPerRow).map(({ name, type, images }) => (
                                    <Tile
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={type}
                                        useArtistPictureStyle
                                    />
                                ))
                            }
                            hideRestListPart
                            artistsList
                            extraContentText="Show more"
                            extraContentLink={() => {
                                navigateToPage(toPopularList)
                                dispatch(setPopularListTitle("Popular artists"))
                            }
                            }
                        />
                        <TilesList
                            title="Popular artists"
                            listContent={
                                artists.map(({ name, type, images }) => (
                                    <Tile
                                        picture={images[0].url}
                                        title={name}
                                        subInfo={type}
                                    />
                                ))
                            }
                        />
                    </>
            }
        />
    );
};