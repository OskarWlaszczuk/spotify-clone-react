import { Main } from "../../../common/components/Main";
import { useSelector } from "react-redux";
import { albumsSelectors, albumsActions } from "../albums/albumsSlice";
import { artistsSelectors, artistsActions } from "../artists/artistsSlice";
import { useFetchStatuses } from "../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";

export const HomePage = () => {
    const { fetch: fetchAlbums, clear: clearAlbums } = albumsActions;
    const { fetch: fetchArtists, clear: clearArtists } = artistsActions;

    const albumsStatus = useSelector(albumsSelectors.selectStatus);
    const artistsStatus = useSelector(artistsSelectors.selectStatus);

    const { isInitial, isLoading, isSucces, isError } = useFetchStatuses(
        [
            albumsStatus,
            artistsStatus
        ],
        [
            { fetchAction: fetchAlbums, clearAction: clearAlbums },
            { fetchAction: fetchArtists, clearAction: clearArtists },
        ],
    );

    if (isInitial) return <Main content={<>Initial</>} />;
    if (isLoading) return <Main content={<>loading</>} />;
    if (isError) return <Main content={<>error</>} />;
    if (isSucces) {
        return (
            <Main
                isGradientAvailable
                content={
                    <MainContent />
                }
            />
        );
    };
};
