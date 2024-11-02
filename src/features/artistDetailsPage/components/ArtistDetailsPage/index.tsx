import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { relatedArtistsActions, relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksActions, artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "../MainContent";
import { Banner } from "../../../../common/components/Banner";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { FetchStatus } from "../../../../common/types/FetchStatus";
import { useArtistAllReleases } from "../../../../common/hooks/useArtistAllReleases";
import { useArtistDetails } from "../../../../common/hooks/useArtistDetails";

export const ArtistDetailsPage = () => {
    const { type, id } = useParams<{ type: string; id: string; }>();

    const { fetch: fetchRelatedArtists, clear: clearRelatedArtists } = relatedArtistsActions;
    const { fetch: fetchTopTracks, clear: clearTopTracks } = artistTopTracksActions;

    const { configs: artistDetailsConfigs, artistDetails, artistDetailsStatus } = useArtistDetails(id);
    const { configs: artistAllReleasesConfigs, artistAllReleasesStatus, artistAllReleasesList } = useArtistAllReleases(id);

    useFetchAPI(
        [
            artistDetailsConfigs,
            artistAllReleasesConfigs,
            { fetchAction: fetchRelatedArtists, clearAction: clearRelatedArtists, endpoint: `artists/${id}/related-artists` },
            { fetchAction: fetchTopTracks, clearAction: clearTopTracks, endpoint: `artists/${id}/top-tracks` },
        ], [id]
    );

    const relatedArtistsStatus: FetchStatus = useSelector(relatedArtistsSelectors.selectStatus);
    const topTracksStatus: FetchStatus = useSelector(artistTopTracksSelectors.selectStatus);

    const name = artistDetails?.name;
    const followers = artistDetails?.followers;
    const images = artistDetails?.images;
    const pictureUrl = images && images.length > 0 ? images[0]?.url : "";


    const fetchStatus = useFetchStatus(
        [
            artistDetailsStatus,
            artistAllReleasesStatus,
            relatedArtistsStatus,
            topTracksStatus,
        ]
    );

    return (
        <Main
            fetchStatus={fetchStatus}
            bannerContent={!type && (
                <Banner
                    picture={pictureUrl}
                    title={name}
                    caption="Verified artist"
                    subTitleContent={`${followers?.total?.toLocaleString()} followers`}
                    isArtistPictureStyle
                />)
            }
            content={<MainContent name={name} allReleases={artistAllReleasesList} />}
        />
    )
};