import { useSelector } from "react-redux";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../slices/trackDetailsSlice";
import { useParams } from "react-router-dom";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { useApiData } from "../../../../common/hooks/useApiData";
import { artistsActions, artistsSelectors } from "../../../homePage/slices/artistsSlice";
import { useState } from "react";
import { LyricsLine, LyricsSection } from "../MainContent/Lyrics/styled";
import { ArtistCardContainer, ArtistCardSection, LyricsAndArtistsCardSectionContainer, Paragraph, StyledLink, Text } from "../../../../common/components/ArtistCard";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { Picture } from "../../../../common/components/Picture";
import { useLyrics } from "../../hooks/useLyrics";
import { ToggleViewButton } from "../../../../common/components/ToggleViewButton";
import { trackRecommendationsActions, trackRecommendationsSelectors } from "../../slices/trackRecommendationsSlice";
import { Table } from "../../../../common/components/Table";
import { artistTopTracksActions, artistTopTracksSelectors } from "../../../artistDetailsPage/slices/artistTopTracksSlice";
import { albumsParamDiscography, relatedArtistsParam, singleParamDiscography } from "../../../../common/constants/params";
import { nanoid } from "nanoid";
import { Tile } from "../../../../common/components/Tile";
import { TilesList } from "../../../../common/components/TilesList";
import { useActiveTile } from "../../../../common/hooks/useActiveTile";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../../artistDetailsPage/slices/artistAlbumsSlice";
import { relatedArtistsActions, relatedArtistsSelectors } from "../../../artistDetailsPage/slices/relatedArtistsSlice";
import { filterByAlbumGroup } from "../../../../common/functions/filterByAlbumGroup";
import { initial } from "../../../../common/constants/fetchStatuses";
import { getImage } from "../../../../common/functions/getImage";
import { renderMetaDatasContent } from "../../../../common/functions/renderMetaDatasContent";
import { renderSubTitleContent } from "../../../../common/functions/renderSubTitleContent";

export const TrackDetailsPage = () => {
    const { trackID, artistsIDs } = useParams();
    const mainArtistID = artistsIDs.split(',')[0];

    const [hideRestLyrics, setHideRestLyrics] = useState(true);
    const [artistsAlbums, setArtistsAlbums] = useState([]);
    const [artistsAlbumsStatus, setArtistsAlbumsStatus] = useState(initial);

    const { fetch: fetchTrackDetails, clear: clearTrackDetails } = trackDetailsActions;
    const { fetch: fetchTrackRecommandations, clear: clrearTrackRecommandations } = trackRecommendationsActions;
    const { fetch: fetchArtistAlbums, clear: clrearArtistAlbums } = artistAlbumsActions;

    const artistsIDsList = artistsIDs.split(",");



    const {
        configs: relatedArtistsConfigs,
        status: relatedArtistsStatus,
        datas: relatedArtists
    } = useApiData(relatedArtistsActions, relatedArtistsSelectors, `artists/${mainArtistID}/related-artists`);

    const {
        configs: artistsDetailsConfigs,
        status: artistsDetailsStatus,
        datas: artistsDetails
    } = useApiData(artistsActions, artistsSelectors, `artists?ids=${artistsIDs}`);

    const {
        configs: artistAlbumsConfigs,
        status: artistAlbumsStatus,
        datas: artistAlbums
    } = useApiData(
        artistAlbumsActions,
        artistAlbumsSelectors,
        `artists/${mainArtistID}/albums?include_groups=single%2Calbum&limit=50`
    );

    const {
        configs: topTracksConfigs,
        status: topTracksStatus,
        datas: topTracks
    } = useApiData(artistTopTracksActions, artistTopTracksSelectors, `artists/${mainArtistID}/top-tracks`);

    const mainArtistReleases = artistAlbums?.items;

    const mainArtistAlbums = filterByAlbumGroup(mainArtistReleases, "album");
    const mainArtistSingles = filterByAlbumGroup(mainArtistReleases, "single");

    const trackDetailsStatus = useSelector(trackDetailsSelectors.selectStatus);
    const trackDetails = useSelector(trackDetailsSelectors.selectDatas)?.datas;

    const trackRecommandationsStatus = useSelector(trackRecommendationsSelectors.selectStatus);
    const trackRecommandations = useSelector(trackRecommendationsSelectors.selectDatas)?.datas.tracks;

    const track = {
        name: trackDetails?.name,
        type: trackDetails?.type,
        id: trackDetails?.id,
        duration: fromMillisecondsToMinutes(trackDetails?.duration_ms),
        popularity: trackDetails?.popularity,
    };

    const album = {
        name: trackDetails?.album.name,
        image: getImage(trackDetails?.album.images),
        releaseDate: trackDetails?.album.release_date,
        id: trackDetails?.album.id,
    };

    const artists = {
        artistsList: artistsDetails?.artists,
    };
    const mainArtist = {
        name: artistsDetails?.artists[0].name,
        id: artistsDetails?.artists[0].id,
        image: getImage(artistsDetails?.artists[0].images),
    };

    useFetchAPI(
        [
            ...artistsAlbums,
            relatedArtistsConfigs,
            artistAlbumsConfigs,
            topTracksConfigs,
            artistsDetailsConfigs,
            { fetchAction: fetchTrackDetails, clearAction: clearTrackDetails, endpoint: `tracks/${trackID}` },
            { fetchAction: fetchTrackRecommandations, clearAction: clrearTrackRecommandations, endpoint: `recommendations?limit=10&seed_tracks=${trackID}` },
        ],
        [trackID, artistsIDs]
    );

    const metaDatasContent = renderMetaDatasContent(album.releaseDate, track.duration.replace(".", ":"), `${track.popularity}/100`);

    const subTitleContent = renderSubTitleContent({
        albumDetails: {
            id: album.id,
            name: album.name,
        },
        mainArtistDetails: {
            id: mainArtist.id,
            name: mainArtist.name,
        },
        artistImage: mainArtist.image,
    })

    const { lyrics, lyricsFetchStatus } = useLyrics(mainArtist.name, track.name);

    const fetchStatus = useFetchStatus([
        relatedArtistsStatus,
        artistAlbumsStatus,
        topTracksStatus,
        trackDetailsStatus,
        artistsDetailsStatus,
        lyricsFetchStatus,
        trackRecommandationsStatus
    ]);

    const previewLyrics = lyrics?.split('\n').slice(0, 13).join('\n');

    const formatLyrics = (lyrics) => {
        return lyrics?.split('\n').map((line, index) => (
            <LyricsLine key={index}>{line}</LyricsLine>
        ));
    };

    const { setActiveTile, isTileActive } = useActiveTile();

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
                        <LyricsAndArtistsCardSectionContainer>
                            <LyricsSection>
                                {formatLyrics(hideRestLyrics ? previewLyrics : lyrics)}
                                <ToggleViewButton
                                    onClick={() => setHideRestLyrics(hideRestLyrics => !hideRestLyrics)}
                                >
                                    {hideRestLyrics ? "...Show more" : "Show less lyrics"}
                                </ToggleViewButton>
                            </LyricsSection>
                            <ArtistCardSection>
                                {
                                    artists.artistsList?.map(({ id, name, type, images }) => (
                                        <StyledLink to={toArtist({ id })}>
                                            <ArtistCardContainer>
                                                <Picture $picture={getImage(images)} $useArtistPictureStyle />
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
                        <Table
                            list={trackRecommandations}
                            caption="Recommended"
                            subCaption="Based on this song"
                            hideIndex
                        />
                        <Table
                            list={topTracks?.tracks}
                            caption={mainArtist.name}
                        />
                        < TilesList
                            title={`Popular Albums by ${mainArtist.name}`}
                            list={mainArtistAlbums}
                            renderItem={({ images, name, type, id, artists }, index) => (
                                <Tile
                                    isActive={isTileActive(index, 1)}
                                    mouseEventHandlers={{
                                        enter: () => setActiveTile({
                                            activeTileIndex: index,
                                            activeTilesListID: 1,
                                        }),
                                        leave: () => setActiveTile({
                                            activeTileIndex: undefined,
                                            activeTilesListID: undefined,
                                        }),
                                    }}
                                    key={nanoid()}
                                    toPage={toAlbum({ albumID: id })}
                                    picture={getImage(images)}
                                    title={name}
                                    subInfo={type || ""}
                                    isArtistPictureStyle={false}
                                />
                            )}
                            hideRestListPart
                            fullListData={{
                                pathname: toArtist({
                                    id: mainArtistID,
                                    additionalPath: albumsParamDiscography,
                                }),
                                text: fullListLinkText,
                            }}
                        />
                        < TilesList
                            title={`Popular Singles and EP's by ${mainArtist.name}`}
                            list={mainArtistSingles}
                            renderItem={({ images, name, type, id, artists }, index) => (
                                <Tile
                                    isActive={isTileActive(index, 2)}
                                    mouseEventHandlers={{
                                        enter: () => setActiveTile({
                                            activeTileIndex: index,
                                            activeTilesListID: 2,
                                        }),
                                        leave: () => setActiveTile({
                                            activeTileIndex: undefined,
                                            activeTilesListID: undefined,
                                        }),
                                    }}
                                    key={nanoid()}
                                    toPage={toAlbum({ albumID: id })}
                                    picture={getImage(images)}
                                    title={name}
                                    subInfo={type || ""}
                                    isArtistPictureStyle={false}
                                />
                            )}
                            hideRestListPart
                            fullListData={{
                                pathname: toArtist({
                                    id: mainArtistID,
                                    additionalPath: singleParamDiscography,
                                }),
                                text: fullListLinkText,
                            }}
                        />
                        < TilesList
                            title={`Related artists`}
                            list={relatedArtists?.artists}
                            renderItem={({ images, name, type, id }, index) => (
                                <Tile
                                    isActive={isTileActive(index, 3)}
                                    mouseEventHandlers={{
                                        enter: () => setActiveTile({
                                            activeTileIndex: index,
                                            activeTilesListID: 3,
                                        }),
                                        leave: () => setActiveTile({
                                            activeTileIndex: undefined,
                                            activeTilesListID: undefined,
                                        }),
                                    }}
                                    key={nanoid()}
                                    toPage={toArtist({ id })}
                                    picture={getImage(images)}
                                    title={name}
                                    subInfo={type || ""}
                                    isArtistPictureStyle={true}
                                />
                            )}
                            hideRestListPart
                            fullListData={{
                                pathname: toArtist({
                                    id: mainArtistID,
                                    additionalPath: relatedArtistsParam,
                                }),
                                text: fullListLinkText,
                            }}
                        />
                    </>
                }
            />
        </>
    )
};