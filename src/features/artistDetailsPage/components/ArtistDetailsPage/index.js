import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";
import { Banner } from "../../../../common/components/Banner";
import { useArtistTopTracks } from "../../../../common/hooks/useArtistTopTracks";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { getFirstImage } from "../../../../common/functions/getFirstImage";
import { useMainArtistData } from "../../../../common/hooks/useMainArtistData";

export const ArtistDetailsPage = () => {
    const { fullListType, id: artistId } = useParams();

    const { mainArtistDetails, mainArtistReleases, mainArtistDataStatuses } = useMainArtistData({
        mainArtistId: artistId,
    });

    const {
        artistTopTracksStatus,
        artistTopTracksAsAlbumsList,
        artistTopTracksList
    } = useArtistTopTracks({ artistId });

    const fetchStatus = useFetchStatus([artistTopTracksStatus, ...mainArtistDataStatuses]);

    const mainArtistReleasesList = mainArtistReleases?.items;
    const [{ name, followers, images }] = getSpecificKeys(mainArtistDetails, ["name", "followers", "images"]);

    return (
        <Main
            currentFetchStatus={fetchStatus}
            bannerContent={!fullListType && (
                <Banner
                    picture={getFirstImage(images)}
                    title={name}
                    caption="Verified artist"
                    subTitleContent={`${followers?.total} followers`}
                    useArtistPictureStyle
                />)
            }
            content={
                <MainContent
                    artistName={name}
                    artistAllReleases={mainArtistReleasesList}
                    artistTopTracks={artistTopTracksList}
                    artistTopTracksAsAlbums={artistTopTracksAsAlbumsList}
                />
            }
        />
    );
};