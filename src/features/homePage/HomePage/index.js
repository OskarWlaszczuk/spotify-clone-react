import { useEffect } from "react";
import { Main } from "../../../common/components/Main";
import { useDispatch, useSelector } from "react-redux";
import { albumsSelectors, albumsActions } from "../albums/albumsSlice";
import { artistsSelectors, artistsActions } from "../artists/artistsSlice";
import { useFetchStatuses } from "../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";

export const HomePage = () => {
    const dispatch = useDispatch();

    const { fetch: fetchAlbums, clear: clearAlbums } = albumsActions;
    const { fetch: fetchArtists, clear: clearArtists } = artistsActions;

    const albumsStatus = useSelector(albumsSelectors.selectStatus);
    const artistsStatus = useSelector(artistsSelectors.selectStatus);

    const { isInitial, isLoading, isSucces, isError } = useFetchStatuses([albumsStatus, artistsStatus]);

    useEffect(() => {
        const fetchDelayID = setTimeout(() => {
            dispatch(fetchAlbums());
            dispatch(fetchArtists());
        }, 1000);

        return () => {
            clearTimeout(fetchDelayID);
            clearAlbums();
            clearArtists();
        };

    }, [dispatch, fetchAlbums, fetchArtists, clearAlbums, clearArtists]);

    if (isLoading) return <Main content={<>loading</>} />;
    if (isError) return <Main content={<>error</>} />;
    if (isInitial) return <Main content={<>Initial</>} />;

    if (isSucces) {
        return (
            <Main
                gradientAvailable
                content={
                    <MainContent />
                }
            />
        );
    };
};
