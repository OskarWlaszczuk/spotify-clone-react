import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { artistDetailsActions, artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { artistAlbumsSelectors, artistAlbumsActions } from "../../slices/artistAlbumsSlice";
import { relatedArtistsActions, relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksActions, artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { Main } from "../../../../common/components/Main";
import { artistSinglesActions, artistSinglesSelectors } from "../../slices/artistSinglesSlice";
import { artistCompilationActions, artistCompilationSelectors } from "../../slices/artistCompilationSlice";
import { useFetchStatuses } from "../../../../common/hooks/useFetchStatuses";
import { artistAppearsOnActions, artistAppearsOnSelectors } from "../../slices/artistAppearsOnSlice";
import { MainContent } from "../MainContent";
import { Banner } from "../../../../common/components/Banner";

export const ArtistDetailsPage = () => {
    const { type, id } = useParams();

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

    const details = useSelector(artistDetailsSelectors.selectDatas)?.datas;
    const name = details?.name;
    const followers = details?.followers;

    const images = details?.images;
    const pictureUrl = images && images.length > 0 ? images[0]?.url : "";

    const { isInitial, isLoading, isSucces, isError } = useFetchStatuses(
        [
            detailsStatus,
            albumsStatus,
            relatedArtistsStatus,
            topTracksStatus,
            singlesStatus,
            compilationsStatus,
            appearsOnStatus
        ],
        [
            { fetchAction: fetchArtistDetails, clearAction: clearArtistDetails, endpoint: `artists/${id}/` },
            { fetchAction: fetchArtistAlbums, clearAction: clearArtistAlbums, endpoint: `artists/${id}/albums?include_groups=album&limit=20` },
            { fetchAction: fetchRelatedArtists, clearAction: clearRelatedArtists, endpoint: `artists/${id}/related-artists` },
            { fetchAction: fetchTopTracks, clearAction: clearTopTracks, endpoint: `artists/${id}/top-tracks` },
            { fetchAction: fetchArtistSingles, clearAction: clearArtistSingles, endpoint: `artists/${id}/albums?include_groups=single&limit=50` },
            { fetchAction: fetchArtistCompilation, clearAction: clearArtistCompilation, endpoint: `artists/${id}/albums?include_groups=compilation&limit=50` },
            { fetchAction: fetchArtistAppearsOn, clearAction: clearArtistAppearsOn, endpoint: `artists/${id}/albums?include_groups=appears_on&limit=50` },
        ]
    );

    if (isLoading) return <Main content={<>loading</>} />;
    if (isError) return <Main content={<>error</>} />;
    if (isInitial) return <Main content={<>Initial</>} />;
    if (isSucces && images)
        return (
            <Main
                banner={!type && (
                    <Banner
                        picture={pictureUrl}
                        title={name}
                        caption="Verified artist"
                        metaDatas={`${followers?.total?.toLocaleString()} followers`}
                        isArtistPictureStyle
                    />)
                }
                content={
                    <>
                        <MainContent />
                    </>
                }
            />
        )
};