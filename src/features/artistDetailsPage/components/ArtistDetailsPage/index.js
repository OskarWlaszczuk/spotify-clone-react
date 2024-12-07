import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";
import { Banner } from "../../../../common/components/Banner";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useApiResource } from "../../../../common/hooks/useApiResource";
import { artistDetailsActions, artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../slices/artistAlbumsSlice";
import { getArtistReleasesEndpointResource } from "../../../../common/functions/getArtistReleasesEndpointResource";
import { useArtistTopTracks } from "../../../../common/hooks/useArtistTopTracks";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { getImage } from "../../../../common/functions/getImage";

export const ArtistDetailsPage = () => {
    const { type, id: artistId } = useParams();

    const {
        configs: artistDataConfig,
        apiStatus: artistDataStatus,
        rawApiData: artistData
    } = useApiResource({
        actions: artistDetailsActions,
        selectors: artistDetailsSelectors,
        endpoint: `artists/${artistId}`,
    });

    const {
        configs: artistAllReleasesConfig,
        apiStatus: artistAllReleasesStatus,
        rawApiData: artistAllReleasesList
    } = useApiResource({
        actions: artistAlbumsActions,
        selectors: artistAlbumsSelectors,
        endpoint: `artists/${artistId}/${getArtistReleasesEndpointResource({ isAppearOnReleasesInclude: true })}`,
    });

    const {
        artistTopTracksStatus,
        artistTopTracksAsAlbumsList,
        artistTopTracksList
    } = useArtistTopTracks({ artistId });

    useFetchAPI({
        fetchConfigs: [artistDataConfig, artistAllReleasesConfig],
        dependencies: [artistId]
    });

    const fetchStatus = useFetchStatus([artistTopTracksStatus, artistDataStatus, artistAllReleasesStatus]);

    const [{ name, followers, images }] = getSpecificKeys(artistData, ["name", "followers", "images"]);

    return (
        <Main
            currentFetchStatus={fetchStatus}
            bannerContent={!type && (
                <Banner
                    picture={getImage(images)}
                    title={name}
                    caption="Verified artist"
                    subTitleContent={`${followers?.total} followers`}
                    isArtistPictureStyle
                />)
            }
            content={
                <MainContent
                    artistsData={{
                        name: name,
                        allReleasesList: artistAllReleasesList?.items,
                        topTracksData: {
                            list: artistTopTracksList,
                            listAsAlbums: artistTopTracksAsAlbumsList,
                        }
                    }}
                    artistName={name}
                    artistAllReleas={artistAllReleasesList?.items}
                    artistTopTrackData={{
                        topTracksList: artistTopTracksList,
                        topTracksAlbumsList: artistTopTracksAsAlbumsList,
                    }}
                />
            }
        />
    );
};