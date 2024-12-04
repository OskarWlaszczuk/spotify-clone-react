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
import { allReleaseParamDiscography, relatedArtistsParam } from "../../../../common/constants/params";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { getImage } from "../../../../common/functions/getImage";
import { renderMetaDataContent } from "../../../../common/functions/renderMetaDataContent";
import { renderSubTitleContent } from "../../../../common/functions/renderSubTitleContent";
import { useDependentFetchAPI } from "../../../../common/hooks/useDependentFetchAPI";
import { getYear } from "../../../../common/functions/getYear";
import { getArtistReleasesEndpointResource } from "../../../../common/functions/getArtistReleasesEndpointResource";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { useArtistsAlbumsList } from "../../hooks/useArtistsAlbumsList";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";
import { TrackLyricsSection } from "./TrackLyricsSection";
import { TrackArtistsCardsSection } from "./TrackArtistsCardsSection";
import { LyricsAndArtistsSection } from "./styled";
import { useApiResource } from "../../../../common/hooks/useApiResource";
import { useGroupMainArtistReleases } from "../../hooks/useGroupMainArtistReleases";
import { useEffect, useMemo } from "react";
import { getFilteredTrackData } from "../../functions/getFilteredTrackData";

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


    // const recommendationsList = data?.[1]?.tracks;

    const artistsIdsList = trackData?.artists.map(({ id }) => id);
    const secondaryArtistsIdsList = useMemo(() => artistsIdsList?.slice(1), [artistsIdsList]);

    useFetchAPI([trackDataConfigs], [trackId]);

    const endpointsList = useMemo(() => {
        return [
            { endpoint: `artists/${mainArtistId}/${getArtistReleasesEndpointResource()}` },
            // { endpoint: `artists/${mainArtistId}/related-artists` },
            { endpoint: `artists?ids=${artistsIdsList}` },
            { endpoint: `artists/${mainArtistId}/top-tracks` },
        ]
    }, [mainArtistId, artistsIdsList]);

    const { depentendApiData, depentendApiDataStatus } = useDependentFetchAPI({
        endpointsList,
        fetchCondition: !!mainArtistId,
        dependencies: [trackId]
    });

    const [
        mainArtistAllReleasesData,
        artistsDetails,
        topTracksData,
    ] = getSpecificKeys(depentendApiData, ["artists", "items", "tracks"]);


    useEffect(() => {

    }, [trackId])

    const mainArtistGroupedReleasesList = useGroupMainArtistReleases({
        mainArtistAllReleasesData,
        topTracksList: topTracksData,
        trackId
    });

    const { lyrics } = useLyrics(mainArtistName, trackName);

    const {
        artistsAllReleasesDataList: secondaryArtistsAllReleasesList,
        artistsAllReleasesDataListStatus: secondaryArtistsAllReleasesListStatus
    } = useArtistsAlbumsList({
        artistsIdsList: secondaryArtistsIdsList,
        artistsDataList: trackArtistsList,
        trackId: trackId
    });

    const fetchStatus = useFetchStatus([
        trackDataStatus,
        secondaryArtistsAllReleasesListStatus,
        depentendApiDataStatus,
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
        artistImage: getImage(),
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
                            <TrackArtistsCardsSection artistsDataList={artistsDetails?.artists} />
                        </LyricsAndArtistsSection>

                        {/* <Table
                            list={recommendationsList}
                            caption="Recommended"
                            subCaption="Based on this song"
                            hideIndex
                        /> */}

                        <Table
                            list={topTracksData?.tracks}
                            caption={mainArtistName}
                        />

                        {
                            mainArtistGroupedReleasesList?.map(({ type, list, additionalPath }) => (
                                renderTilesList([{
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
                                }])
                            ))
                        }
                        {
                            secondaryArtistsAllReleasesList?.map(({ list, name, id }) => (
                                renderTilesList([{
                                    title: name,
                                    list: list,
                                    toPageFunction: toAlbum,
                                    fullListData: {
                                        pathname: toArtist({ id, additionalPath: allReleaseParamDiscography }),
                                        text: fullListLinkText
                                    }
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