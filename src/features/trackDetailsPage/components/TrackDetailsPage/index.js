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
import { useArtistsAlbumsList } from "../../hooks/useArtistsAlbumsList";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";
import { TrackLyricsSection } from "./TrackLyricsSection";
import { TrackArtistsCardsSection } from "./TrackArtistsCardsSection";
import { LyricsAndArtistsSection } from "./styled";
import { useApiResource } from "../../../../common/hooks/useApiResource";
import { useGroupMainArtistReleases } from "../../hooks/useGroupMainArtistReleases";
import { getFilteredTrackData } from "../../functions/getFilteredTrackData";
import { useDependentApiFetch } from "../../hooks/useDependentApiFetch";
import { useArtistTopTracks } from "../../../../common/hooks/useArtistTopTracks";

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

    useFetchAPI({
        fetchConfigs: [trackDataConfigs],
        dependencies: [trackId]
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

    const artistsIdsList = trackArtistsList?.map(({ id }) => id);
    const secondaryArtistsIdsList = artistsIdsList?.slice(1);

    const { dependentStatuses, dependentApiData } = useDependentApiFetch({
        mainArtistId,
        artistsIdsList,
        fetchCondition: !!trackData
    });

    const [mainArtistAllReleasesData, artistsDetailsList] = dependentApiData;

    const {
        artistTopTracksStatus,
        artistTopTracksAsAlbumsList,
        artistTopTracksList
    } = useArtistTopTracks({ artistId: mainArtistId })

    const mainArtistGroupedReleasesList = useGroupMainArtistReleases({
        mainArtistAllReleasesData,
        topTracksAsAlbumsList: artistTopTracksAsAlbumsList
    });

    const {
        artistsAllReleasesDataList: secondaryArtistsAllReleasesList,
        artistsAllReleasesDataListStatus: secondaryArtistsAllReleasesListStatus
    } = useArtistsAlbumsList({
        artistsIdsList: secondaryArtistsIdsList,
        artistsDetailsList: trackArtistsList,
        trackId: trackId
    });

    const fetchStatus = useFetchStatus([
        artistTopTracksStatus,
        trackDataStatus,
        secondaryArtistsAllReleasesListStatus,
        ...dependentStatuses,
    ]);

    const { lyrics } = useLyrics(mainArtistName, trackName);

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

                        <Table
                            list={artistTopTracksList}
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
                    </>
                }
            />
        </>
    );
};