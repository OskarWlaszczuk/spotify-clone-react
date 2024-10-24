import { useSelector } from "react-redux";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { albumDetailsActions, albumDetailsSelectors } from "../../slices/albumDetailsSlice";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { MainContent } from "../MainContent";
import { getYear } from "../../../../common/functions/getYear";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { convertToMinutesAndSeconds } from "../../../../common/functions/convertToMinutesAndSeconds";
import { convertMinutesToHours } from "../../../../common/functions/convertMinutesToHours";
import { toArtist } from "../../../../common/functions/routes";
import { ArtistNameLink } from "./styled";

export const AlbumPage = () => {
    const { id: albumID } = useParams();
    const { fetch: fetchAlbumDetails, clear: clearAlbumDetails } = albumDetailsActions;

    const albumDetailsStatus = useSelector(albumDetailsSelectors.selectStatus);
    const albumDetails = useSelector(albumDetailsSelectors.selectDatas)?.datas;
    const fetchStatus = useFetchStatus([albumDetailsStatus]);

    useFetchAPI([
        { fetchAction: fetchAlbumDetails, clearAction: clearAlbumDetails, endpoint: `albums/${albumID}` },
    ]);

    const artists = albumDetails?.artists;

    const image = albumDetails?.images[0].url;
    const name = albumDetails?.name;
    const type = albumDetails?.album_type;

    const releaseDate = getYear(albumDetails?.release_date);
    const totalTracks = albumDetails?.total_tracks;
    const tracks = albumDetails?.tracks.items;

    const tracksDurations = tracks?.map(({ duration_ms }) => duration_ms);
    const totalDuration = fromMillisecondsToMinutes(tracksDurations?.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    const totalDurationConverted = totalDuration >= 60 ? convertMinutesToHours(totalDuration) : convertToMinutesAndSeconds(totalDuration);

    const metaDatasContent = [releaseDate, `${totalTracks} songs, ${totalDurationConverted}`].join(" • ");
    const subTitleContent = artists?.map(({ name, id }, index) => (
        <ArtistNameLink to={toArtist({ id })}> {index !== 0 && " • "}{name} </ArtistNameLink>
    ));

    return (
        <Main
            fetchStatus={fetchStatus}
            bannerContent={
                <Banner
                    picture={image}
                    subTitleContent={subTitleContent}
                    metaDatas={metaDatasContent}
                    title={name}
                    caption={type}
                />
            }
            content={<MainContent />}
        />
    );
};