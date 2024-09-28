import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { artistDetailsActions, artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { useEffect } from "react";
import { artistAlbumsSelectors, artistAlbumsActions } from "../../slices/artistAlbumsSlice";
import { relatedArtistsActions, relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksActions, artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { artistSinglesActions, artistSinglesSelectors } from "../../slices/artistSinglesSlice";
import { artistCompilationActions, artistCompilationSelectors } from "../../slices/artistCompilationSlice";
import { useFetchStatuses } from "../../../../common/hooks/useFetchStatuses";
import { artistAppearsOnActions, artistAppearsOnSelectors } from "../../slices/artistAppearsOnSlice";
import { MainContent } from "../MainContent";

export const ArtistDetailsPage = () => {
    const { id, type } = useParams();

    const dispatch = useDispatch()

    const { fetch: fetchArtistDetails, clear: clearArtistDetails } = artistDetailsActions;
    const { fetch: fetchArtistAlbums, clear: clearArtistAlbums } = artistAlbumsActions;
    const { fetch: fetchRelatedArtists, clear: clearRelatedArtists } = relatedArtistsActions;
    const { fetch: fetchTopTracks, clear: clearTopTracks } = artistTopTracksActions;
    const { fetch: fetchArtistSingles, clear: clearArtistSingles } = artistSinglesActions;
    const { fetch: fetchArtistCompilation, clear: clearArtistCompilation } = artistCompilationActions;
    const { fetch: fetchArtistAppearsOn, clear: clearArtistAppearsOn } = artistAppearsOnActions;

    const detailsStatus = useSelector(artistDetailsSelectors.selectStatus);
    const appearsOnStatus = useSelector(artistAppearsOnSelectors.selectStatus);
    const albumsStatus = useSelector(artistAlbumsSelectors.selectStatus);
    const compilationsStatus = useSelector(artistCompilationSelectors.selectStatus);
    const singlesStatus = useSelector(artistSinglesSelectors.selectStatus);
    const relatedArtistsStatus = useSelector(relatedArtistsSelectors.selectStatus);
    const topTracksStatus = useSelector(artistTopTracksSelectors.selectStatus)


    const { isInitial, isLoading, isSucces, isError } = useFetchStatuses([
        detailsStatus,
        albumsStatus,
        relatedArtistsStatus,
        topTracksStatus,
        singlesStatus,
        compilationsStatus,
        appearsOnStatus
    ]);

    useEffect(() => {
        const fetchDelayId = setTimeout(() => {
            dispatch(fetchArtistDetails({ id }));
            dispatch(fetchRelatedArtists({ id }));
            dispatch(fetchTopTracks({ id }));
            dispatch(fetchArtistAlbums({ id }));
            dispatch(fetchArtistSingles({ id }));
            dispatch(fetchArtistCompilation({ id }));
            dispatch(fetchArtistAppearsOn({ id }));
        }, 500);

        return () => {
            clearTimeout(fetchDelayId);

            clearArtistDetails();
            clearArtistAlbums();
            clearRelatedArtists();
            clearTopTracks();
            clearArtistCompilation();
            clearArtistSingles();
            clearArtistAppearsOn();
        };
    }, [
        dispatch,
        fetchArtistDetails,
        fetchArtistAlbums,
        fetchRelatedArtists,
        fetchArtistSingles,
        fetchArtistCompilation,
        fetchTopTracks,
        fetchArtistAppearsOn,
        clearArtistDetails,
        clearRelatedArtists,
        clearArtistAlbums,
        clearTopTracks,
        clearArtistSingles,
        clearArtistCompilation,
        clearArtistAppearsOn,
        id,
    ]);

    if (isLoading) return <Main content={<>loading</>} />;
    if (isError) return <Main content={<>error</>} />;
    if (isInitial) return <Main content={<>Initial</>} />;
    if (isSucces)
        return (
            <Main
                gradientAvailable={!type}
                content={
                    <>
                        <MainContent />
                    </>
                }
            />
        )
};