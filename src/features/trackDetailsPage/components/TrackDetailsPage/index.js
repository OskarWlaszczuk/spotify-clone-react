import { useSelector } from "react-redux";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../slices/trackDetailsSlice";
import { Link, useParams } from "react-router-dom";
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
import { LyricsLine, LyricsSection } from "../MainContent/Lyrics/styled";
import { ArtistCardContainer, ArtistCardSection, LyricsAndArtistsCardSectionContainer, Paragraph, StyledLink, Text } from "../../../../common/components/ArtistCard";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { Picture } from "../../../../common/components/Picture";
import { useLyrics } from "../../hooks/useLyrics";

export const TrackDetailsPage = () => {
    const { trackID, artistsIDs } = useParams();

    const [hideRestLyrics, setHideRestLyrics] = useState(true);

    const { fetch: fetchTrackDetails, clear: clearTrackDetails } = trackDetailsActions;

    const {
        configs: artistsDetailsConfigs,
        status: artistsDetailsStatus,
        datas: artistsDetails
    } = useApiData(artistsActions, artistsSelectors, `artists?ids=${artistsIDs}`);

    const trackDetailsStatus = useSelector(trackDetailsSelectors.selectStatus);
    const trackDetails = useSelector(trackDetailsSelectors.selectDatas)?.datas;

    useFetchAPI([
        artistsDetailsConfigs,
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
        artistsList: artistsDetails?.artists,
    };

    const mainArtist = {
        name: artistsDetails?.artists[0].name,
        id: artistsDetails?.artists[0].id,
        image: artistsDetails?.artists[0].images[0].url,
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

    const { lyrics, lyricsFetchStatus } = useLyrics(mainArtist.name, track.name);
    console.log(mainArtist.name, track.name)

    const fetchStatus = useFetchStatus([trackDetailsStatus, artistsDetailsStatus, lyricsFetchStatus]);

    const previewLyrics = lyrics?.split('\n').slice(0, 13).join('\n');

    const formatLyrics = (lyrics) => {
        return lyrics?.split('\n').map((line, index) => (
            <LyricsLine key={index}>{line}</LyricsLine>
        ));
    };

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
                    <LyricsAndArtistsCardSectionContainer>
                        <LyricsSection>
                            {formatLyrics(hideRestLyrics ? previewLyrics : lyrics)}
                            <button onClick={() => setHideRestLyrics(hideRestLyrics => !hideRestLyrics)}>{hideRestLyrics ? "...Show more" : "Show less lyrics"}</button>
                        </LyricsSection>
                        <ArtistCardSection>
                            {
                                artists.artistsList?.map(({ id, name, type, images }) => (
                                    <StyledLink to={toArtist({ id })}>
                                        <ArtistCardContainer>
                                            <Picture $picture={images[0].url} $useArtistPictureStyle />
                                            <Text>
                                                <Paragraph>{capitalizeFirstLetter(type)}</Paragraph>
                                                <Paragraph $specialOnHover>{name}</Paragraph>
                                            </Text>
                                        </ArtistCardContainer>
                                    </StyledLink>
                                ))
                            }
                        </ArtistCardSection>
                    </LyricsAndArtistsCardSectionContainer>
                }
            />
        </>
    )
}