import { useParams } from "react-router-dom";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { useLyrics } from "../../hooks/useLyrics";
import { getFirstImage } from "../../../../common/functions/getFirstImage";
import { useGroupMainArtistReleases } from "../../hooks/useGroupMainArtistReleases";
import { getFilteredTrackData } from "../../functions/getFilteredTrackData";
import { useDependentApiFetch } from "../../hooks/useDependentApiFetch";
import { useArtistTopTracks } from "../../../../common/hooks/useArtistTopTracks";
import { MainContent } from "./MainContent";
import { renderBannerContent } from "../../../../common/functions/renderBannerContent";
import { useFetchTrackDetails } from "../../hooks/useFetchTrackDetails";
import { useFetchArtistReleases } from "../../../../common/hooks/useFetchArtistReleases";
import { useFetchArtistDetails } from "../../../../common/hooks/useFetchArtistDetails";
import { useFetchSeveralArtists } from "../../../../common/hooks/useFetchSeveralArtists";

export const TrackDetailsPage = () => {
    const { id: trackId } = useParams();

    const { trackDetails, trackDetailsStatus } = useFetchTrackDetails(trackId)

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
    ] = getFilteredTrackData(trackDetails);

    const artistsIdsList = trackArtistsList?.map(({ id }) => id);
    const secondaryArtistsDetails = trackArtistsList?.slice(1);

    const fetchCondition = !!trackDetails;

    // const { artistReleasesStatus, artistReleasesData } = useFetchArtistReleases({ artistId: mainArtistId, fetchCondition });
    // const { artistDetailsStatus, artistDetails } = useFetchSeveralArtistsDetails({ artistsIds: artistsIdsList, fetchCondition })
    // console.log(artistReleasesData, artistDetails);

    
    useDependentApiFetch({
        mainArtistId,
        artistsIdsList,
        fetchCondition: !!trackDetails,
        pageId: trackId
    });
    // console.log(dependentApiData)
    // const [mainArtistAllReleasesData, artistsDetailsList] = dependentApiData;

    const {
        artistTopTracksStatus,
        artistTopTracksAsAlbumsList,
        artistTopTracksList
    } = useArtistTopTracks({ artistId: mainArtistId })

    // const mainArtistGroupedReleasesList = useGroupMainArtistReleases({
    //     mainArtistAllReleasesData,
    //     topTracksAsAlbumsList: artistTopTracksAsAlbumsList
    // });

    // const {
    //     artistsAllReleasesDataList: secondaryArtistsAllReleasesList,
    //     artistsAllReleasesDataListStatus: secondaryArtistsAllReleasesListStatus
    // } = useArtistsAlbumsList({
    //     artistsDetailsList: secondaryArtistsDetails,
    //     trackId: trackId
    // });

    const fetchStatus = useFetchStatus([
        artistTopTracksStatus,
        trackDetailsStatus,
        // secondaryArtistsAllReleasesListStatus,
        // ...dependentStatuses,
    ]);

    const { lyrics } = useLyrics(mainArtistName, trackName);

    // const { metaDataContent, subTitleContent } = renderBannerContent({
    //     metaData: {
    //         releaseDate: albumReleaseDate,
    //         duration: fromMillisecondsToMinutes(trackDurationInMs)?.toFixed(2).replace(".", ":"),
    //         uniqueData: `${trackPopularityScale} / 100`,
    //     },
    //     subTitleData: {
    //         trackDetailsPageData: {
    //             mainArtistData: {
    //                 id: mainArtistId,
    //                 name: mainArtistName,
    //             },
    //             albumData: {
    //                 id: albumId,
    //                 name: albumName,
    //             }
    //         },
    //         artistImagesList: artistsDetailsList?.artists[0].images
    //     },
    // });

    return (
        <>
            <Main
                currentFetchStatus={fetchStatus}
                bannerContent={
                    // <Banner
                    //     picture={getFirstImage(albumImages)}
                    //     title={trackName}
                    //     caption={trackType}
                    //     subTitleContent={subTitleContent}
                    //     metaData={metaDataContent}
                    // />
                    <></>
                }
                content={
                    // <MainContent
                    //     mainArtistData={{
                    //         id: mainArtistId,
                    //         name: mainArtistName,
                    //         topTracksList: artistTopTracksList,
                    //         groupedReleasesList: mainArtistGroupedReleasesList,
                    //     }}
                    //     lyrics={lyrics}
                    //     artistsDetailsList={artistsDetailsList?.artists}
                    //     secondaryArtistsAllReleasesList={secondaryArtistsAllReleasesList}
                    // />
                    <></>
                }
            />
        </>
    );
};