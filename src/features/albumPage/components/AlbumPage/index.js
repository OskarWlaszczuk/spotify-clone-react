import { useSelector } from "react-redux";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { albumDetailsActions, albumDetailsSelectors } from "../../slices/albumDetailsSlice";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { MainContent } from "../MainContent";
import { getAlbumArtists } from "../../../../common/functions/getAlbumArtists";
import { getYear } from "../../../../common/functions/getYear";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { convertToMinutesAndSeconds } from "../../../../common/functions/convertToMinutesAndSeconds";
import { convertMinutesToHours } from "../../../../common/functions/convertMinutesToHours";

export const AlbumPage = () => {
    const { id: albumID } = useParams();

    const { fetch: fetchAlbumDetails, clear: clearAlbumDetails } = albumDetailsActions;

    const albumDetailsStatus = useSelector(albumDetailsSelectors.selectStatus);
    const albumDetails = useSelector(albumDetailsSelectors.selectDatas)?.datas;

    const image = albumDetails?.images[0].url;
    const name = albumDetails?.name;
    const type = albumDetails?.album_type;
    const artists = albumDetails?.artists;

    const releaseDate = getYear(albumDetails?.release_date);
    const totalTracks = albumDetails?.total_tracks;
    const tracks = albumDetails?.tracks.items;

    const tracksDurations = tracks?.map(({ duration_ms }) => duration_ms);
    const totalDuration = fromMillisecondsToMinutes(tracksDurations?.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    const totalDurationConverted = totalDuration >= 60 ? convertMinutesToHours(totalDuration) : convertToMinutesAndSeconds(totalDuration);
    console.log(totalDuration)
    const metaDatas = [releaseDate, `${totalTracks} songs, ${totalDurationConverted}`].join(" • ");

    const fetchStatus = useFetchStatus([albumDetailsStatus]);

    useFetchAPI([
        { fetchAction: fetchAlbumDetails, clearAction: clearAlbumDetails, endpoint: `albums/${albumID}` }
    ]);

    return (
        <Main
            fetchStatus={fetchStatus}
            bannerContent={
                <Banner
                    picture={image}
                    subContent={getAlbumArtists(artists)}
                    metaDatas={metaDatas}
                    title={name}
                    caption={type}
                    isArtistPictureStyle={false}
                />
            }
            content={<MainContent />}
        />
    );
};