import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { artistDetailsActions, artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { artistAlbumsSelectors, artistAlbumsActions } from "../../slices/artistAlbumsSlice";
import { relatedArtistsActions, relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksActions, artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { Main } from "../../../../common/components/Main";
import { artistSinglesActions, artistSinglesSelectors } from "../../slices/artistSinglesSlice";
import { artistCompilationActions, artistCompilationSelectors } from "../../slices/artistCompilationSlice";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { artistAppearsOnActions, artistAppearsOnSelectors } from "../../slices/artistAppearsOnSlice";
import { MainContent } from "../MainContent";
import { Banner } from "../../../../common/components/Banner";

export const ArtistDetailsPage = () => {
    const { type, id } = useParams<{ type: string; id: string; }>();

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

    const albumGroupsEndpoint = '/albums?include_groups';
    const groupLimit = "limit=50";

    const fetchStatus = useFetchStatus(
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
            { fetchAction: fetchArtistAlbums, clearAction: clearArtistAlbums, endpoint: `artists/${id}${albumGroupsEndpoint}=album&${groupLimit}` },
            { fetchAction: fetchRelatedArtists, clearAction: clearRelatedArtists, endpoint: `artists/${id}/related-artists` },
            { fetchAction: fetchTopTracks, clearAction: clearTopTracks, endpoint: `artists/${id}/top-tracks` },
            { fetchAction: fetchArtistSingles, clearAction: clearArtistSingles, endpoint: `artists/${id}${albumGroupsEndpoint}=single&${groupLimit}` },
            { fetchAction: fetchArtistCompilation, clearAction: clearArtistCompilation, endpoint: `artists/${id}${albumGroupsEndpoint}=compilation&${groupLimit}` },
            { fetchAction: fetchArtistAppearsOn, clearAction: clearArtistAppearsOn, endpoint: `artists/${id}${albumGroupsEndpoint}=appears_on&${groupLimit}` },
        ],
    );

    return (
        <Main
            fetchStatus={fetchStatus}
            banner={!type && (
                <Banner
                    picture={pictureUrl}
                    title={name}
                    caption="Verified artist"
                    metaDatas={`${followers?.total?.toLocaleString()} followers`}
                    isArtistPictureStyle
                />)
            }
            content={<MainContent />}
        />
    )
};