import { useSelector } from "react-redux";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../slices/trackDetailsSlice";
import { useParams } from "react-router-dom";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { useEffect, useMemo, useState } from "react";
import { LyricsSection } from "./TrackLyricsSection/styled";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { Picture } from "../../../../common/components/Picture";
import { useLyrics } from "../../hooks/useLyrics";
import { trackRecommendationsActions, trackRecommendationsSelectors } from "../../slices/trackRecommendationsSlice";
import { Table } from "../../../../common/components/Table";
import { albumsParamDiscography, allReleaseDiscography, relatedArtistsParam, singleParamDiscography } from "../../../../common/constants/params";
import { nanoid } from "nanoid";
import { Tile } from "../../../../common/components/Tile";
import { TilesList } from "../../../../common/components/TilesList";
import { useActiveTile } from "../../../../common/hooks/useActiveTile";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { filterByAlbumGroup } from "../../../../common/functions/filterByAlbumGroup";
import { error, initial, loading, success } from "../../../../common/constants/fetchStatuses";
import { getImage } from "../../../../common/functions/getImage";
import { renderMetaDatasContent } from "../../../../common/functions/renderMetaDatasContent";
import { renderSubTitleContent } from "../../../../common/functions/renderSubTitleContent";
import { selectAccessToken } from "../../../../common/slices/authSlice";
import { useDependentFetchAPI } from "../../../../common/hooks/useDependentFetchAPI";
import { getYear } from "../../../../common/functions/getYear";
import { fetchFromAPI } from "../../../../common/functions/fetchFromAPI";
import { allReleasesEndpointResource } from "../../../../common/constants/allReleasesEndpointResource";
import { useArtistPopularReleases } from "../../../../common/hooks/useArtistPopularReleases";
import { removeDuplicates } from "../../../../common/functions/removeDuplicates";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { useArtistsAlbumsDatasList } from "../../hooks/useArtistsAlbumsDatasList";
import { ToggleViewButton } from "../../../../common/components/ToggleViewButton";
import { formatLyrics } from "../../functions/formatLyrics";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";
import { TrackLyricsSection } from "./TrackLyricsSection";
import { TrackArtistsCardsSection } from "./TrackArtistsCardsSection";
import { LyricsAndArtistsSection } from "./styled";

export const TrackDetailsPage = () => {
    const { id: trackId } = useParams();

    const { setActiveTile, isTileActive } = useActiveTile();
    const renderTilesList = useRenderTilesList();

    const { fetch: fetchTrackData, clear: clearTrackData } = trackDetailsActions;
    const { fetch: fetchTrackRecommandationsDatasList, clear: clearTrackRecommandationsDatasList } = trackRecommendationsActions;

    const rawTrackRecommandationsDatasList = useSelector(trackRecommendationsSelectors.selectDatas)?.datas.tracks;
    const trackRecommandationsDatasListStatus = useSelector(trackRecommendationsSelectors.selectStatus);

    // console.log(rawTrackRecommandationsDatasList)

    const rawTrackData = useSelector(trackDetailsSelectors.selectDatas)?.datas;
    const trackDataStatus = useSelector(trackDetailsSelectors.selectStatus);

    const artistsIdsList = rawTrackData?.artists.map(({ id }) => id);
    const secondaryArtistsIdsList = artistsIdsList?.slice(1);

    const { datas: rawArtistsDatasList, datasStatus: artistsDatasListStatus } = useDependentFetchAPI({
        endpointConfig: {
            routePath: `artists?ids=${artistsIdsList}`,
            params: [artistsIdsList],
        },
        fetchCondition: !!artistsIdsList,
        dependencies: [trackId],
    });

    const formattedTrackData = getSpecificKeys(rawTrackData, ["name", "type", "id", "duration_ms", "popularity", "artists"]);
    const formattedAlbumData = getSpecificKeys(rawTrackData?.album, ["name", "release_date", "id", "images"]);
    const formattedMainArtistData = getSpecificKeys(rawArtistsDatasList?.artists[0], ["name", "id", "images"]);

    const {
        artistTopTracksDatasListStatus,
        topTracksAsAlbumsDatasList,
        rawTopTracksDatasList,
    } = useArtistPopularReleases({ artistId: formattedMainArtistData.id, dependencies: [trackId] });
console.log(rawTopTracksDatasList)

    useFetchAPI(
        [
            { fetchAction: fetchTrackData, clearAction: clearTrackData, endpoint: `tracks/${trackId}` },
            { fetchAction: fetchTrackRecommandationsDatasList, clearAction: clearTrackRecommandationsDatasList, endpoint: `recommendations?limit=10&seed_tracks=${trackId}` },
        ],
        [trackId]
    );

    const { lyrics, lyricsFetchStatus } = useLyrics(formattedMainArtistData.name, formattedTrackData.name, trackId);

    const { datas: relatedArtistsDatasList, datasStatus: relatedArtistsDatasListStatus } = useDependentFetchAPI({
        endpointConfig: {
            routePath: `artists/${formattedMainArtistData.id}/related-artists`,
            params: [formattedMainArtistData.id],
        },
        fetchCondition: !!formattedMainArtistData.id,
        dependencies: [trackId],
    });

    const { datas: mainArtistAllReleasesData, datasStatus: mainArtistAllReleasesDataStatus } = useDependentFetchAPI({
        endpointConfig: {
            routePath: `artists/${formattedMainArtistData.id}/${allReleasesEndpointResource}`,
            params: [formattedMainArtistData.id, allReleasesEndpointResource],
        },
        fetchCondition: !!formattedMainArtistData.id,
        dependencies: [trackId],
    });

    const mainArtistAllReleasesItemsList = mainArtistAllReleasesData?.items;

    const mainArtistAlbums = filterByAlbumGroup(mainArtistAllReleasesItemsList, "album");
    const mainArtistSingles = filterByAlbumGroup(mainArtistAllReleasesItemsList, "single");

    const popularReleases = [...topTracksAsAlbumsDatasList || [], ...mainArtistAllReleasesItemsList || []];

    const mainArtistGroupedReleasesList = [
        { type: "Releases", list: removeDuplicates(popularReleases, "name"), listId: 1, additionalPath: allReleaseDiscography },
        { type: "Albums", list: mainArtistAlbums, listId: 2, additionalPath: albumsParamDiscography },
        { type: "Singles and EP's", list: mainArtistSingles, listId: 3, additionalPath: singleParamDiscography },
    ];

    const {
        artistsAllReleasesDatasList: secondaryArtistsAllReleasesList,
        artistsAllReleasesDatasListStatus: secondaryArtistsAllReleasesListStatus
    } = useArtistsAlbumsDatasList({
        artistsIdsList: secondaryArtistsIdsList,
        artistsDatasList: rawArtistsDatasList,
        trackId: trackId
    });

    const fetchStatus = useFetchStatus([
        artistTopTracksDatasListStatus,
        artistsDatasListStatus,
        trackDataStatus,
        // lyricsFetchStatus,
        secondaryArtistsAllReleasesListStatus,
        mainArtistAllReleasesDataStatus,
        trackRecommandationsDatasListStatus,
        relatedArtistsDatasListStatus,
    ]);

    const metaDatasContent = renderMetaDatasContent({
        releaseDate: getYear(formattedAlbumData.release_date),
        duration: fromMillisecondsToMinutes(formattedTrackData.duration_ms).replace(".", ":"),
        uniqueData: `${formattedTrackData.popularity} / 100`
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
                            <TrackArtistsCardsSection artistsDatasList={rawArtistsDatasList?.artists} />
                        </LyricsAndArtistsSection>

                        {/* <Table
                            list={rawTrackRecommandationsDatasList}
                            caption="Recommended"
                            subCaption="Based on this song"
                            hideIndex
                        /> */}

                        <Table
                            list={rawTopTracksDatasList}
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
                                    list: relatedArtistsDatasList?.artists,
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