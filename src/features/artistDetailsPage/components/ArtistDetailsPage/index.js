import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";
import { Banner } from "../../../../common/components/Banner";
import { useArtistTopTracks } from "../../../../common/hooks/useArtistTopTracks";
import { getFirstImage } from "../../../../common/functions/getFirstImage";
import { useMainArtistData } from "../../../../common/hooks/useMainArtistData";

export const ArtistDetailsPage = () => {
    const { fullListType, id: artistID } = useParams();

    const artistData = useMainArtistData({ artistID });
    const topTracks = useArtistTopTracks({ artistID });

    const fetchStatus = useFetchStatus([topTracks.status, ...artistData.statuses]);
    return (
        <Main
            currentFetchStatus={fetchStatus}
            bannerContent={!fullListType && (
                <Banner
                    picture={getFirstImage(artistData.details?.images)}
                    title={artistData.details?.name}
                    caption="Verified artist"
                    subTitleContent={`${artistData.details?.followers.total} followers`}
                    useArtistPictureStyle
                />)
            }
            content={
                <MainContent
                    fullListType={fullListType}
                    artistData={artistData}
                    topTracks={topTracks}
                />
            }
        />
    );
};