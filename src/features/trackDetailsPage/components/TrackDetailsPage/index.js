import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../slices/trackDetailsSlice";
import { useParams } from "react-router-dom";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { useLyrics } from "../../hooks/useLyrics";
import { getImage } from "../../../../common/functions/getImage";
import { useArtistsAlbumsList } from "../../hooks/useArtistsAlbumsList";
import { useApiResource } from "../../../../common/hooks/useApiResource";
import { useGroupMainArtistReleases } from "../../hooks/useGroupMainArtistReleases";
import { getFilteredTrackData } from "../../functions/getFilteredTrackData";
import { useDependentApiFetch } from "../../hooks/useDependentApiFetch";
import { useArtistTopTracks } from "../../../../common/hooks/useArtistTopTracks";
import { MainContent } from "./MainContent";
import { renderBannerContent } from "../../../../common/functions/renderBannerContent";

export const TrackDetailsPage = () => {
    const { id: trackId } = useParams();

    const {
        configs: trackDataConfigs,
        apiStatus: trackDataStatus,
        rawApiData: trackData
    } = useApiResource({
        actions: trackDetailsActions,
        selectors: trackDetailsSelectors,
        endpoint: `tracks/${trackId}`,
    });

    useFetchAPI({
        fetchConfigs: [trackDataConfigs],
        dependencies: [trackId],
        pageId:trackId,
    });

    const [
        {
            name: trackName,
            type: trackType,
            duration_ms: trackDurationInMs,
            popularity: trackPopularityScale,
            artists: trackArtistsList,
        },
        {
            name: albumName,
            release_date: albumReleaseDate,
            id: albumId,
            images: albumImages,
        },
        {
            name: mainArtistName,
            id: mainArtistId,
        },
    ] = getFilteredTrackData(trackData);

    const artistsIdsList = trackArtistsList?.map(({ id }) => id);
    const secondaryArtistsIdsList = artistsIdsList?.slice(1);

    const { dependentStatuses, dependentApiData } = useDependentApiFetch({
        mainArtistId,
        artistsIdsList,
        fetchCondition: !!trackData,
    });

    const [mainArtistAllReleasesData, artistsDetailsList] = dependentApiData;

    const {
        artistTopTracksStatus,
        artistTopTracksAsAlbumsList,
        artistTopTracksList
    } = useArtistTopTracks({ artistId: mainArtistId })

    const mainArtistGroupedReleasesList = useGroupMainArtistReleases({
        mainArtistAllReleasesData,
        topTracksAsAlbumsList: artistTopTracksAsAlbumsList
    });

    const {
        artistsAllReleasesDataList: secondaryArtistsAllReleasesList,
        artistsAllReleasesDataListStatus: secondaryArtistsAllReleasesListStatus
    } = useArtistsAlbumsList({
        artistsIdsList: secondaryArtistsIdsList,
        artistsDetailsList: trackArtistsList,
        trackId: trackId
    });

    const fetchStatus = useFetchStatus([
        artistTopTracksStatus,
        trackDataStatus,
        secondaryArtistsAllReleasesListStatus,
        ...dependentStatuses,
    ]);

    const { lyrics } = useLyrics(mainArtistName, trackName);

    const { metaDataContent, subTitleContent } = renderBannerContent({
        metaData: {
            releaseDate: albumReleaseDate,
            duration: fromMillisecondsToMinutes(trackDurationInMs).replace(".", ":"),
            uniqueData: `${trackPopularityScale} / 100`,
        },
        subTitleData: {
            albumDetails: {
                id: albumId,
                name: albumName,
            },
            mainArtistDetails: {
                id: mainArtistId,
                name: mainArtistName,
            },
            artistImage: artistsDetailsList?.artists[0].images
        },
    });

    return (
        <>
            <Main
                currentFetchStatus={fetchStatus}
                bannerContent={
                    <Banner
                        picture={getImage(albumImages)}
                        title={trackName}
                        caption={trackType}
                        subTitleContent={subTitleContent}
                        metaData={metaDataContent}
                    />
                }
                content={
                    <MainContent
                        mainArtistData={{
                            id: mainArtistId,
                            name: mainArtistName,
                            topTracksList: artistTopTracksList,
                            groupedReleasesList: mainArtistGroupedReleasesList,
                        }}
                        lyrics={lyrics}
                        artistsDetailsList={artistsDetailsList?.artists}
                        secondaryArtistsAllReleasesList={secondaryArtistsAllReleasesList}
                    />
                }
            />
        </>
    );
};