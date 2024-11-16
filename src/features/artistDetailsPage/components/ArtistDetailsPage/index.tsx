import { useParams } from "react-router-dom";
import { relatedArtistsActions, relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksActions, artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "../MainContent";
import { Banner } from "../../../../common/components/Banner";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useApiData } from "../../../../common/hooks/useApiData";
import { artistDetailsActions, artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../slices/artistAlbumsSlice";
import { allReleasesEndpointResource } from "../../../../common/constants/allReleasesEndpointResource";
import { useArtistPopularReleases } from "../../../../common/hooks/useArtistPopularReleases";

export const ArtistDetailsPage = () => {
    const { type, id } = useParams<{ type: string; id: string; }>();

    const {
        configs: relatedArtistsConfigs,
        status: relatedArtistsStatus,
        datas: relatedArtists
    } = useApiData(relatedArtistsActions, relatedArtistsSelectors, `artists/${id}/related-artists`);
    // const {
    //     configs: topTracksConfigs,
    //     status: topTracksStatus,
    //     datas: topTracks
    // } = useApiData(artistTopTracksActions, artistTopTracksSelectors, `artists/${id}/top-tracks`);

    const {
        rawArtistTopTracksDatasStatus,
        topTracksAsAlbumsList,
        topTracksDatasList
    } = useArtistPopularReleases({artistId:id});

    const {
        configs: artistDetailsConfigs,
        status: artistDetailsStatus,
        datas: artistDetails
    } = useApiData(artistDetailsActions, artistDetailsSelectors, `artists/${id}`);
    const {
        configs: artistAllReleasesConfigs,
        status: artistAllReleasesStatus,
        datas: artistAllReleasesList
    } = useApiData(artistAlbumsActions, artistAlbumsSelectors, `artists/${id}/${allReleasesEndpointResource}`);

    useFetchAPI(
        [
            artistDetailsConfigs,
            artistAllReleasesConfigs,
            relatedArtistsConfigs
        ],
        [id]
    );

    const name = artistDetails?.name;
    const followers = artistDetails?.followers;
    const images = artistDetails?.images;
    const pictureUrl = images && images.length > 0 ? images[0]?.url : "";

    const fetchStatus = useFetchStatus([
        artistDetailsStatus,
        artistAllReleasesStatus,
        relatedArtistsStatus,
        rawArtistTopTracksDatasStatus,
        relatedArtistsStatus,
    ]);

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
            content={
                <MainContent
                    name={name}
                    allReleases={artistAllReleasesList?.items}
                    topTracksAsAlbumsList={topTracksAsAlbumsList}
                    topTracksDatasList={topTracksDatasList}
                    relatedArtists={relatedArtists?.artists}
                />
            }
        />
    )
};