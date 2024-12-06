import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../slices/trackDetailsSlice";
import { useParams } from "react-router-dom";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { useLyrics } from "../../hooks/useLyrics";
import { Table } from "../../../../common/components/Table";
import { allReleaseParamDiscography } from "../../../../common/constants/params";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { getImage } from "../../../../common/functions/getImage";
import { renderMetaDataContent } from "../../../../common/functions/renderMetaDataContent";
import { renderSubTitleContent } from "../../../../common/functions/renderSubTitleContent";
import { getYear } from "../../../../common/functions/getYear";
import { getArtistReleasesEndpointResource } from "../../../../common/functions/getArtistReleasesEndpointResource";
import { useArtistsAlbumsList } from "../../hooks/useArtistsAlbumsList";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";
import { TrackLyricsSection } from "./TrackLyricsSection";
import { TrackArtistsCardsSection } from "./TrackArtistsCardsSection";
import { LyricsAndArtistsSection } from "./styled";
import { useApiResource } from "../../../../common/hooks/useApiResource";
import { useGroupMainArtistReleases } from "../../hooks/useGroupMainArtistReleases";
import { useMemo } from "react";
import { getFilteredTrackData } from "../../functions/getFilteredTrackData";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../../artistDetailsPage/slices/artistAlbumsSlice";
import { artistsActions, artistsSelectors } from "../../../homePage/slices/artistsSlice";
import { artistTopTracksActions, artistTopTracksSelectors } from "../../../artistDetailsPage/slices/artistTopTracksSlice";

//Dodać ponownie rekomnedację i powiązanych artystów, gdy API znów będzie wspierane

export const TrackDetailsPage = () => {
    const { id: trackId } = useParams();
    const renderTilesList = useRenderTilesList();

    const {
        configs: trackDataConfigs,
        apiStatus: trackDataStatus,
        rawApiData: trackData
    } = useApiResource({
        actions: trackDetailsActions,
        selectors: trackDetailsSelectors,
        endpoint: `tracks/${trackId}`,
    });

    const [
        {
            name: trackName,
            type: trackType,
            duration_ms: trackDurationInMs,
            popularity: trackPopularityScale,
            artists: trackArtistsList,
        },
        {
            name: albumName,
            release_date: albumReleaseDate,
            id: albumId,
            images: albumImages,
        },
        {
            name: mainArtistName,
            id: mainArtistId,
        },
    ] = getFilteredTrackData(trackData);

    const memoizedArtistsIdsList = trackArtistsList?.map(({ id }) => id);
    const secondaryArtistsIdsList = useMemo(() => memoizedArtistsIdsList?.slice(1), [memoizedArtistsIdsList]);

    const {
        configs: mainArtistAllReleasesDataConfig,
        apiStatus: mainArtistAllReleasesDataStatus,
        rawApiData: mainArtistAllReleasesData
    } = useApiResource({
        actions: artistAlbumsActions,
        selectors: artistAlbumsSelectors,
        endpoint: `artists/${mainArtistId}/${getArtistReleasesEndpointResource()}`,
    });
    const {
        configs: artistsDetailsListConfig,
        apiStatus: artistsDetailsListStatus,
        rawApiData: artistsDetailsList
    } = useApiResource({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: `artists?ids=${memoizedArtistsIdsList}`,
    });

    const {
        configs: mainArtistTopTracksConfig,
        apiStatus: mainArtistTopTracksStatus,
        rawApiData: mainArtistTopTracks
    } = useApiResource({
        actions: artistTopTracksActions,
        selectors: artistTopTracksSelectors,
        endpoint: `artists/${mainArtistId}/top-tracks`,
    });

    useFetchAPI({
        fetchConfigs: [trackDataConfigs],
        dependencies: [trackId]
    });
    useFetchAPI({
        fetchConfigs: [mainArtistAllReleasesDataConfig, artistsDetailsListConfig, mainArtistTopTracksConfig],
        dependencies: [mainArtistId],
        fetchCondition: !!trackData
    });

    const mainArtistGroupedReleasesList = useGroupMainArtistReleases({
        mainArtistAllReleasesData,
        topTracksList: mainArtistTopTracks,
        trackId
    });

    const { lyrics } = useLyrics(mainArtistName, trackName);

    const {
        artistsAllReleasesDataList: secondaryArtistsAllReleasesList,
        artistsAllReleasesDataListStatus: secondaryArtistsAllReleasesListStatus
    } = useArtistsAlbumsList({
        artistsIdsList: secondaryArtistsIdsList,
        artistsDetailsList: trackArtistsList,
        trackId: trackId
    });

    const fetchStatus = useFetchStatus([
        trackDataStatus,
        secondaryArtistsAllReleasesListStatus,
        artistsDetailsListStatus,
        mainArtistAllReleasesDataStatus,
        mainArtistTopTracksStatus,
    ]);

    const metaDataContent = renderMetaDataContent({
        releaseDate: getYear(albumReleaseDate),
        duration: fromMillisecondsToMinutes(trackDurationInMs).replace(".", ":"),
        uniqueData: `${trackPopularityScale} / 100`,
    });

    const subTitleContent = renderSubTitleContent({
        albumDetails: {
            id: albumId,
            name: albumName,
        },
        mainArtistDetails: {
            id: mainArtistId,
            name: mainArtistName,
        },
        artistImage: getImage(artistsDetailsList?.artists[0].images),
    });

    return (
        <>
            <Main
                fetchStatus={fetchStatus}
                bannerContent={
                    <Banner
                        picture={getImage(albumImages)}
                        title={trackName}
                        caption={trackType}
                        subTitleContent={subTitleContent}
                        metaData={metaDataContent}
                    />
                }
                content={
                    <>
                        <LyricsAndArtistsSection>
                            {lyrics && <TrackLyricsSection lyrics={lyrics} />}
                            <TrackArtistsCardsSection artistsDataList={artistsDetailsList?.artists} />
                        </LyricsAndArtistsSection>

                        {/* <Table
                            list={recommendationsList}
                            caption="Recommended"
                            subCaption="Based on this song"
                            hideIndex
                        /> */}

                        <Table
                            list={mainArtistTopTracks?.tracks}
                            caption={mainArtistName}
                        />

                        {
                            mainArtistGroupedReleasesList?.map(({ type, list, additionalPath, listId }) => {
                                return renderTilesList([{
                                    title: `Popular ${type} by ${mainArtistName}`,
                                    list: list,
                                    toPageFunction: toAlbum,
                                    fullListData: {
                                        pathname: toArtist({
                                            id: mainArtistId,
                                            additionalPath,
                                        }),
                                        text: fullListLinkText,
                                    },
                                    listId
                                }])
                            })
                        }
                        {
                            secondaryArtistsAllReleasesList?.map(({ list, name, id, listId }) => (
                                renderTilesList([{
                                    title: name,
                                    list,
                                    toPageFunction: toAlbum,
                                    fullListData: {
                                        pathname: toArtist({ id, additionalPath: allReleaseParamDiscography }),
                                        text: fullListLinkText
                                    },
                                    listId
                                }])
                            ))
                        }
                        {/* {
                            renderTilesList([
                                {
                                    title: "Fans also like",
                                    list: relatedArtistsList,
                                    toPageFunction: toArtist,
                                    fullListData: {
                                        pathname: toArtist({ id: mainArtistId, additionalPath: relatedArtistsParam }),
                                        text: fullListLinkText
                                    },
                                    isArtistsList: true,
                                },
                            ])
                        } */}
                    </>
                }
            />
        </>
    )
};