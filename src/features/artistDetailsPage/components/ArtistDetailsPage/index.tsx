import { useParams } from "react-router-dom";
import { relatedArtistsActions, relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "../MainContent";
import { Banner } from "../../../../common/components/Banner";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useApiData, useApiResources } from "../../../../common/hooks/useApiData";
import { artistDetailsActions, artistDetailsSelectors } from "../../slices/artistDetailsSlice";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../slices/artistAlbumsSlice";
import { allReleasesEndpointResource } from "../../../../common/constants/allReleasesEndpointResource";
import { useArtistPopularReleases } from "../../../../common/hooks/useArtistPopularReleases";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { getImage } from "../../../../common/functions/getImage";

export const ArtistDetailsPage = () => {
    const { type, id } = useParams<{ type: string; id: string; }>();

    const { configs, statuses, datas } = useApiResources([
        { action: relatedArtistsActions, selectors: relatedArtistsSelectors, endpoint: `artists/${id}/related-artists` },
        { action: artistDetailsActions, selectors: artistDetailsSelectors, endpoint: `artists/${id}` },
        { action: artistAlbumsActions, selectors: artistAlbumsSelectors, endpoint: `artists/${id}/${allReleasesEndpointResource}` },
    ]);

    const relatedArtistsList = datas?.[0]?.artists;
    const artistData: any = datas?.[1];
    const artistAllReleasesList = datas?.[2]?.items;

    const { name, followers, images }: any = getSpecificKeys(artistData, ["name", "followers", "images"]);

    const {
        artistTopTracksDatasListStatus,
        topTracksAsAlbumsDatasList,
        rawTopTracksDatasList
    } = useArtistPopularReleases({ artistId: id });

    useFetchAPI([...configs], [id]);

    const fetchStatus = useFetchStatus([artistTopTracksDatasListStatus, ...statuses]);

    return (
        <Main
            fetchStatus={fetchStatus}
            bannerContent={!type && (
                <Banner
                    picture={getImage(images)}
                    title={name}
                    caption="Verified artist"
                    subTitleContent={`${followers} followers`}
                    isArtistPictureStyle
                />)
            }
            content={
                <MainContent
                    name={name}
                    allReleases={artistAllReleasesList}
                    topTracksAsAlbumsList={topTracksAsAlbumsDatasList}
                    topTracksDatasList={rawTopTracksDatasList}
                    relatedArtists={relatedArtistsList}
                />
            }
        />
    )
};