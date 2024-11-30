import { useParams } from "react-router-dom";
// import { relatedArtistsActions, relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "../MainContent";
import { Banner } from "../../../../common/components/Banner";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useApiResources } from "../../../../common/hooks/useApiResources";
import { artistDetailsActions, artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../slices/artistAlbumsSlice";
import { getArtistReleasesEndpointResource } from "../../../../common/functions/getArtistReleasesEndpointResource";
import { useArtistTopTracks } from "../../../../common/hooks/useArtistTopTracks";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { getImage } from "../../../../common/functions/getImage";

export const ArtistDetailsPage = () => {
    const { type, id: artistId } = useParams<{ type: string; id: string; }>();

    const { configs, statuses, apiData: apiDataList } = useApiResources([
        // {
        //     action: relatedArtistsActions,
        //     selectors: relatedArtistsSelectors,
        //     endpoint: `artists/${artistId}/related-artists`,
        // },
        {
            action: artistDetailsActions,
            selectors: artistDetailsSelectors,
            endpoint: `artists/${artistId}`,
        },
        {
            action: artistAlbumsActions,
            selectors: artistAlbumsSelectors,
            endpoint: `artists/${artistId}/${getArtistReleasesEndpointResource({ isAppearOnReleasesInclude: true })}`,
        },
    ]);

    const {
        artistTopTracksDataListStatus,
        artistTopTracksAsAlbumsList,
        artistTopTracksList,
    } = useArtistTopTracks({ artistId });

    useFetchAPI([...configs], [artistId]);

    const fetchStatus = useFetchStatus([artistTopTracksDataListStatus, ...statuses]);

    // const relatedArtistsList = data?.[0]?.artists;
    const [artistData, artistAllReleasesData] = apiDataList;
    const [{ name, followers, images }]: any = getSpecificKeys(artistData, ["name", "followers", "images"]);

    return (
        <Main
            fetchStatus={fetchStatus}
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
                    artistName={name}
                    artistAllReleas={artistAllReleasesData?.items}
                    artistTopTrackData={{
                        topTracksList: artistTopTracksList,
                        topTracksAlbumsList: artistTopTracksAsAlbumsList,
                    }}
                    artistRelatedArtists={[]}
                />
            }
        />
    );
};