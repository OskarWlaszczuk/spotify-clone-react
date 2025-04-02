import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { getFirstImage } from "../../../../common/functions/getFirstImage";
import { useAlbumDetails } from "../../hooks/useAlbumDetails";
import { useMainArtistData } from "../../../../common/hooks/useMainArtistData";
import { calculateTotalDuration } from "../../functions/calculateTotalDuration";
import { MainContent } from "./MainContent";
import { renderBannerContent } from "../../../../common/functions/renderBannerContent";

export const AlbumPage = () => {
    const { id: albumId } = useParams();

    const album = useAlbumDetails(albumId);
    const tracks = album.details?.tracks?.items;
    const mainArtistID = album.details?.artists?.[0].id;

    const mainArtist = useMainArtistData({ artistID: mainArtistID });

    const fetchStatus = useFetchStatus([album.status, ...mainArtist.statuses,]);

    const { metaDataContent, subTitleContent } = renderBannerContent({
        metaData: {
            releaseDate: album.details?.release_date,
            duration: calculateTotalDuration(tracks),
            uniqueData: `${album.details?.total_tracks} songs`,
        },
        subTitleData: {
            albumDetailsPageData: {
                artistsList: album.details?.artists,
            },
            artistImagesList: mainArtist.details?.images,
        },
    });

    return (
        <Main
            currentFetchStatus={fetchStatus}
            bannerContent={
                <Banner
                    picture={getFirstImage(album.details?.images)}
                    subTitleContent={subTitleContent}
                    metaData={metaDataContent}
                    title={album.details?.name}
                    caption={album.details?.album_type}
                />
            }
            content={
                <>
                    <MainContent album={album} mainArtist={mainArtist} tracks={tracks} />
                </>
            }
        />
    );
};