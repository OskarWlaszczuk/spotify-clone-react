import { useSelector } from "react-redux";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../slices/trackDetailsSlice";
import { useParams } from "react-router-dom";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { getYear } from "../../../../common/functions/getYear";
import { AvatarImage } from "../../../../common/components/AvatarImage";
import { ArtistNameLink } from "../../../albumPage/components/AlbumPage/styled";
import { toAlbum, toArtist } from "../../../../common/functions/routes";

export const TrackDetailsPage = () => {
    const { trackID } = useParams();

    const { fetch: fetchTrackDetails, clear: clearTrackDetails } = trackDetailsActions;

    const trackDetailsStatus = useSelector(trackDetailsSelectors.selectStatus);
    const trackDetails = useSelector(trackDetailsSelectors.selectDatas)?.datas;

    const fetchStatus = useFetchStatus([trackDetailsStatus]);

    useFetchAPI([
        { fetchAction: fetchTrackDetails, clearAction: clearTrackDetails, endpoint: `tracks/${trackID}` },
        // { fetchAction: fetchArtists, clearAction: clearArtists, endpoint: `artists?ids=${artistsIDs}` },
    ]);
    console.log(trackDetails)
    const track = {
        name: trackDetails?.name,
        type: trackDetails?.type,
        duration: fromMillisecondsToMinutes(trackDetails?.duration_ms),
        popularity: trackDetails?.popularity,
    };

    const album = {
        name: trackDetails?.album.name,
        image: trackDetails?.album.images[0].url,
        releaseDate: trackDetails?.album.release_date,
        id: trackDetails?.album.id,
    }

    const artists = {
        artistsList: trackDetails?.artists,
    };

    const mainArtist = {
        name: trackDetails?.artists[0].name,
        id: trackDetails?.artists[0].id,
    };

    const metaDatasContent = [getYear(album.releaseDate), `${track.duration.replace(".", ":")}, ${track.popularity}/100`].join(" • ");
    const subTitleContent = <>
        <AvatarImage
            src={""}
            alt={mainArtist.name}
            title={mainArtist.name}
            $smaller
            $useArtistPictureStyle
        />
        <ArtistNameLink to={toArtist({ id: mainArtist.id })}>{mainArtist.name}</ArtistNameLink>{" • "}
        <ArtistNameLink $thinner to={toAlbum({ albumID: album.id, artistID: mainArtist.id })}>{album.name}</ArtistNameLink>
    </>


    return (
        <>
            <Main
                fetchStatus={fetchStatus}
                bannerContent={
                    <Banner
                        picture={album.image}
                        title={track.name}
                        caption={track.type}
                        subTitleContent={subTitleContent}
                        metaDatas={metaDatasContent}
                    />
                }
                content={
                    <>

                    </>
                }
            />
        </>
    )
}