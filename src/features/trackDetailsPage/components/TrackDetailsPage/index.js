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
import { useApiData } from "../../../../common/hooks/useApiData";
import { artistsActions, artistsSelectors } from "../../../homePage/slices/artistsSlice";
import { useEffect, useState } from "react";
import { initial, loading, success, error } from "../../../../common/constants/fetchStatuses";

export const TrackDetailsPage = () => {
    const { trackID, artistsIDs } = useParams();
    const [lyrics, setLyrics] = useState("");
    const [lyricsFetchStatus, setLyricsFetchStatus] = useState(initial);

    const { fetch: fetchTrackDetails, clear: clearTrackDetails } = trackDetailsActions;

    const {
        configs: artistDetailsConfigs,
        status: artistDetailsStatus,
        datas: artistDetails
    } = useApiData(artistsActions, artistsSelectors, `artists?ids=${artistsIDs}`);

    const trackDetailsStatus = useSelector(trackDetailsSelectors.selectStatus);
    const trackDetails = useSelector(trackDetailsSelectors.selectDatas)?.datas;

    const fetchStatus = useFetchStatus([trackDetailsStatus, artistDetailsStatus, lyricsFetchStatus]);

    useFetchAPI([
        artistDetailsConfigs,
        { fetchAction: fetchTrackDetails, clearAction: clearTrackDetails, endpoint: `tracks/${trackID}` },
    ]);

    const track = {
        name: trackDetails?.name,
        type: trackDetails?.type,
        id: trackDetails?.id,
        duration: fromMillisecondsToMinutes(trackDetails?.duration_ms),
        popularity: trackDetails?.popularity,
    };

    const album = {
        name: trackDetails?.album.name,
        image: trackDetails?.album.images[0].url,
        releaseDate: trackDetails?.album.release_date,
        id: trackDetails?.album.id,
    };

    const artists = {
        artistsList: trackDetails?.artists,
    };

    const mainArtist = {
        name: artistDetails?.artists[0].name,
        id: artistDetails?.artists[0].id,
        image: artistDetails?.artists[0].images[0].url,
    };

    const metaDatasContent = [getYear(album.releaseDate), `${track.duration.replace(".", ":")}, ${track.popularity}/100`].join(" • ");
    const subTitleContent = <>
        <AvatarImage
            src={mainArtist.image}
            alt={mainArtist.name}
            title={mainArtist.name}
            $smaller
            $useArtistPictureStyle
        />{" "}
        <ArtistNameLink to={toArtist({ id: mainArtist.id })}>{mainArtist.name}</ArtistNameLink>{" • "}
        <ArtistNameLink $thinner to={toAlbum({ albumID: album.id, artistID: mainArtist.id })}>{album.name}</ArtistNameLink>
    </>

    const getLyricsForTrack = async (artist, track) => {
        try {
            const response = await fetch(`http://localhost:5000/lyrics?artist=${artist}&track=${track}`);
            const data = await response.json();
            setLyrics(data.lyrics);
            setLyricsFetchStatus(success);

        } catch {
            setLyricsFetchStatus(error);
        }
    };

    useEffect(() => {
        if (mainArtist.name && track.name) {
            getLyricsForTrack(mainArtist.name, track.name);
            setLyricsFetchStatus(loading);
        }
    }, [mainArtist.name, track.name]);

    const formattedLyrics = lyrics?.slice(0, 423).split('\n').map((line, index) => (
        <p key={index}>{line}</p>
    ));

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
                    <section>
                        {formattedLyrics}
                    </section>
                }
            />
        </>
    )
}