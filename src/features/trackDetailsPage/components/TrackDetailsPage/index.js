import { useParams } from "react-router-dom";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { useLyrics } from "../../hooks/useLyrics";
import { getFirstImage } from "../../../../common/functions/getFirstImage";
import { useArtistTopTracks } from "../../../../common/hooks/useArtistTopTracks";
import { MainContent } from "./MainContent";
import { useFetchTrackDetails } from "../../hooks/useFetchTrackDetails";
import { useFetchSeveralArtists } from "../../../../common/hooks/useFetchSeveralArtists";
import { useFetchMediaSortedByCreators } from "../../hooks/useFetchMediaSortedByCreators";

export const TrackDetailsPage = () => {
    const { id: trackID } = useParams();

    const track = useFetchTrackDetails(trackID);
    const artistsIDs = track.details?.trackDetails.artists?.map(({ id }) => id);

    const artists = useFetchSeveralArtists({ IDs: artistsIDs });
    const mainArtist = artists.list?.[0];

    const mediaSortedByCreator = useFetchMediaSortedByCreators({ creatorsDetails: artists.list, dataName: "album", clearData: true });
    const topTracks = useArtistTopTracks({ artistID: mainArtist?.id });
    const { lyrics } = useLyrics(mainArtist?.name, track.details.trackDetails.name);

    const fetchStatus = useFetchStatus([
        track.status,
        artists.status,
        mediaSortedByCreator.status,
        topTracks.status,
    ]);

    // const { metaDataContent, subTitleContent } = renderBannerContent({
    //     metaData: {
    //         releaseDate: albumDetails.release_date,
    //         duration: fromMillisecondsToMinutes(trackDetails?.duration_ms)?.toFixed(2).replace(".", ":"),
    //         uniqueData: `${trackDetails?.popularity} / 100`,
    //     },
    //     subTitleData: {
    //         trackDetailsPageData: {
    //             mainArtistData: {
    //                 id: mainArtistData.id,
    //                 name: mainArtistData.name,
    //             },
    //             albumData: {
    //                 id: albumDetails.id,
    //                 name: albumDetails.name,
    //             }
    //         },
    //         artistImagesList: mainArtistData.images,
    //     },
    // });

    return (
        <>
            <Main
                currentFetchStatus={fetchStatus}
                bannerContent={
                    <Banner
                        picture={getFirstImage(track.details.albumDetails.images)}
                        title={track.details.trackDetails?.name}
                        caption={track.details.trackDetails?.type}
                        subTitleContent={"subTitleContent"}
                        metaData={"metaDataContent"}
                    />
                }
                content={
                    <MainContent
                        lyrics={lyrics}
                        artists={artists}
                        mainArtist={mainArtist}
                        mediaSortedByCreator={mediaSortedByCreator}
                        topTracks={topTracks}
                        track={track}
                    />
                }
            />
        </>
    );
};