import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../slices/trackDetailsSlice";
import { useParams } from "react-router-dom";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { useLyrics } from "../../hooks/useLyrics";
import { trackRecommendationsActions, trackRecommendationsSelectors } from "../../slices/trackRecommendationsSlice";
import { Table } from "../../../../common/components/Table";
import { albumsParamDiscography, allReleaseDiscography, relatedArtistsParam, singleParamDiscography } from "../../../../common/constants/params";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { filterReleasesByGroups } from "../../../../common/functions/filterReleasesByGroups";
import { getImage } from "../../../../common/functions/getImage";
import { renderMetaDatasContent } from "../../../../common/functions/renderMetaDatasContent";
import { renderSubTitleContent } from "../../../../common/functions/renderSubTitleContent";
import { useDependentFetchAPI } from "../../../../common/hooks/useDependentFetchAPI";
import { getYear } from "../../../../common/functions/getYear";
import { getArtistReleasesEndpointResource } from "../../../../common/functions/getArtistReleasesEndpointResource";
import { removeDuplicates } from "../../../../common/functions/removeDuplicates";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { useArtistsAlbumsDatasList } from "../../hooks/useArtistsAlbumsDatasList";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";
import { TrackLyricsSection } from "./TrackLyricsSection";
import { TrackArtistsCardsSection } from "./TrackArtistsCardsSection";
import { LyricsAndArtistsSection } from "./styled";
import { useApiResources } from "../../../../common/hooks/useApiResources";

export const TrackDetailsPage = () => {
    const { id: trackId } = useParams();
    const renderTilesList = useRenderTilesList();

    const { configs, datas, statuses } = useApiResources([
        {
            action: trackDetailsActions,
            selectors: trackDetailsSelectors,
            endpoint: `tracks/${trackId}`,
        },
        {
            action: trackRecommendationsActions,
            selectors: trackRecommendationsSelectors,
            endpoint: `recommendations?limit=10&seed_tracks=${trackId}`,
        },
    ]);

    const trackData = datas?.[0];
    const recommendationsList = datas?.[1]?.tracks;

    const artistsIdsList = trackData?.artists.map(({ id }) => id);
    const mainArtistId = artistsIdsList?.slice(0, 1)[0];
    const secondaryArtistsIdsList = artistsIdsList?.slice(1);

    useFetchAPI([...configs], [trackId]);

    const { depentendApiDatas, depentendApiDatasStatus } = useDependentFetchAPI({
        endpointsList: [
            { endpoint: `artists/${mainArtistId}/${getArtistReleasesEndpointResource()}` },
            { endpoint: `artists/${mainArtistId}/related-artists` },
            { endpoint: `artists?ids=${artistsIdsList}` },
            { endpoint: `artists/${mainArtistId}/top-tracks` },
            { endpoint: `artists/${mainArtistId}/top-tracks` },
        ],
        fetchCondition: !!mainArtistId,
        dependencies: [trackId]
    });

    const mainArtistAllReleasesList = depentendApiDatas?.[0].items;
    const relatedArtistsList = depentendApiDatas?.[1].artists;
    const artistsList = depentendApiDatas?.[2].artists;

    const topTracksList = depentendApiDatas?.[3].tracks;
    const topTracksAsAlbumsList = topTracksList?.map(({ album }) => album);

    const {
        artistsAllReleasesDatasList: secondaryArtistsAllReleasesList,
        artistsAllReleasesDatasListStatus: secondaryArtistsAllReleasesListStatus
    } = useArtistsAlbumsDatasList({
        artistsIdsList: secondaryArtistsIdsList,
        artistsDatasList: artistsList,
        trackId: trackId
    });

    const formattedTrackData = getSpecificKeys(trackData, ["name", "type", "id", "duration_ms", "popularity", "artists"]);
    const formattedAlbumData = getSpecificKeys(trackData?.album, ["name", "release_date", "id", "images"]);
    const formattedMainArtistData = getSpecificKeys(artistsList?.[0], ["name", "id", "images"]);

    const { lyrics } = useLyrics(formattedMainArtistData.name, formattedTrackData.name, trackId);

    const [mainArtistAlbums, mainArtistSingles] = filterReleasesByGroups(mainArtistAllReleasesList, ["album", "single"]);

    const popularReleases = [...topTracksAsAlbumsList || [], ...mainArtistAllReleasesList || []];

    const mainArtistGroupedReleasesList = [
        { type: "Releases", list: removeDuplicates(popularReleases, "name"), listId: 1, additionalPath: allReleaseDiscography },
        { type: "Albums", list: mainArtistAlbums, listId: 2, additionalPath: albumsParamDiscography },
        { type: "Singles and EP's", list: mainArtistSingles, listId: 3, additionalPath: singleParamDiscography },
    ];

    const fetchStatus = useFetchStatus([
        ...statuses,
        secondaryArtistsAllReleasesListStatus,
        depentendApiDatasStatus,
    ]);

    // const { metaDatasContent, subTitleContent } = renderBannerContent({
    //     metaData: {
    //         duration: fromMillisecondsToMinutes(formattedTrackData.duration_ms).replace(".", ":"),
    //         releaseDate: formattedAlbumData.release_date,
    //         uniqueData: `${formattedTrackData.popularity} / 100`,
    //     },
    //     subTitleData: {
    //         albumDetails: {
    //             id: formattedAlbumData.id,
    //             name: formattedAlbumData.name,
    //         },
    //         mainArtistDetails: {
    //             id: formattedMainArtistData.id,
    //             name: formattedMainArtistData.name,
    //         },
    //         artistImage: formattedMainArtistData.images,
    //     }
    // })

    const metaDatasContent = renderMetaDatasContent({
        releaseDate: getYear(formattedAlbumData.release_date),
        duration: fromMillisecondsToMinutes(formattedTrackData.duration_ms).replace(".", ":"),
        uniqueData: `${formattedTrackData.popularity} / 100`,
    });

    const subTitleContent = renderSubTitleContent({
        albumDetails: {
            id: formattedAlbumData.id,
            name: formattedAlbumData.name,
        },
        mainArtistDetails: {
            id: formattedMainArtistData.id,
            name: formattedMainArtistData.name,
        },
        artistImage: getImage(formattedMainArtistData.images),
    });

    return (
        <>
            <Main
                fetchStatus={fetchStatus}
                bannerContent={
                    <Banner
                        picture={getImage(formattedAlbumData.images)}
                        title={formattedTrackData.name}
                        caption={formattedTrackData.type}
                        subTitleContent={subTitleContent}
                        metaDatas={metaDatasContent}
                    />
                }
                content={
                    <>
                        <LyricsAndArtistsSection>
                            {lyrics && <TrackLyricsSection lyrics={lyrics} />}
                            <TrackArtistsCardsSection artistsDatasList={artistsList} />
                        </LyricsAndArtistsSection>

                        <Table
                            list={recommendationsList?.tracks}
                            caption="Recommended"
                            subCaption="Based on this song"
                            hideIndex
                        />

                        <Table
                            list={topTracksList}
                            caption={formattedMainArtistData.name}
                        />

                        {
                            mainArtistGroupedReleasesList?.map(({ type, list, listId, additionalPath }) => (
                                renderTilesList([{
                                    title: `Popular ${type} by ${formattedMainArtistData.name}`,
                                    list: list,
                                    toPageFunction: toAlbum,
                                    fullListData: {
                                        pathname: toArtist({
                                            id: formattedMainArtistData.id,
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
                                        pathname: toArtist({ id, additionalPath: allReleaseDiscography }),
                                        text: fullListLinkText
                                    }
                                }])
                            ))
                        }
                        {
                            renderTilesList([
                                {
                                    title: "Fans also like",
                                    list: relatedArtistsList,
                                    toPageFunction: toArtist,
                                    fullListData: {
                                        pathname: toArtist({ id: formattedMainArtistData.id, additionalPath: relatedArtistsParam }),
                                        text: fullListLinkText
                                    },
                                    isArtistsList: true,
                                },
                            ])
                        }
                    </>
                }
            />
        </>
    )
};