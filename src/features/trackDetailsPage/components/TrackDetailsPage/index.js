import { useSelector } from "react-redux";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../slices/trackDetailsSlice";
import { useParams } from "react-router-dom";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { useEffect, useState } from "react";
import { LyricsSection } from "../MainContent/Lyrics/styled";
import { ArtistCardContainer, ArtistCardSection, LyricsAndArtistsCardSectionContainer, Paragraph, StyledLink, Text } from "../../../../common/components/ArtistCard";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { Picture } from "../../../../common/components/Picture";
import { useLyrics } from "../../hooks/useLyrics";
import { trackRecommendationsActions, trackRecommendationsSelectors } from "../../slices/trackRecommendationsSlice";
import { Table } from "../../../../common/components/Table";
import { allReleaseDiscography, relatedArtistsParam } from "../../../../common/constants/params";
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

export const TrackDetailsPage = () => {
    const { trackID } = useParams();
    const accessToken = useSelector(selectAccessToken);

    const { setActiveTile, isTileActive } = useActiveTile();

    const rawTrackData = useSelector(trackDetailsSelectors.selectDatas)?.datas;
    const trackDataStatus = useSelector(trackDetailsSelectors.selectStatus);

    const { fetch: fetchTrackData, clear: clearTrackData } = trackDetailsActions;
    const { fetch: fetchTrackRecommandations, clear: clrearTrackRecommandations } = trackRecommendationsActions;

    const trackRecommandationsDatasListStatus = useSelector(trackRecommendationsSelectors.selectStatus);
    const rawTrackRecommandationsDatasList = useSelector(trackRecommendationsSelectors.selectDatas)?.datas.tracks;

    console.log(rawTrackRecommandationsDatasList)
    const artistsIdsList = rawTrackData?.artists.map(({ id }) => id);
    const secondaryArtistsIdsList = artistsIdsList?.slice(1);

    const { datas: rawArtistsDatasList, datasStatus: artistsDatasListStatus } = useDependentFetchAPI({
        endpoint: `artists?ids=${artistsIdsList}`,
        fetchCondition: !!artistsIdsList,
        dependencies: [trackID],
    });

    const formattedTrackData = getSpecificKeys(rawTrackData, ["name", "type", "id", "duration_ms", "popularity", "artists"]);
    const albumData = getSpecificKeys(rawTrackData?.album, ["name", "release_date", "id", "images"]);
    const mainArtistData = getSpecificKeys(rawArtistsDatasList.artists?.[0], ["name", "id", "images"]);

    const {
        rawArtistTopTracksDatasStatus,
        topTracksAsAlbumsList,
        topTracksDatasList
    } = useArtistPopularReleases({ artistId: mainArtistData.id, dependencies: [trackID] });

    useFetchAPI(
        [
            { fetchAction: fetchTrackData, clearAction: clearTrackData, endpoint: `tracks/${trackID}` },
            { fetchAction: fetchTrackRecommandations, clearAction: clrearTrackRecommandations, endpoint: `recommendations?limit=10&seed_tracks=${trackID}` },
        ],
        [trackID]
    );

    const { lyrics, lyricsFetchStatus } = useLyrics(mainArtistData.name, formattedTrackData.name, trackID);
    // const [hideRestLyrics, setHideRestLyrics] = useState(true);
    const lyricsPreview = lyrics?.split('\n').slice(0, 13).join('\n');

    const { datas: relatedArtistsList, datasStatus: relatedArtistsListStatus } = useDependentFetchAPI({
        endpoint: `artists/${mainArtistData.id}/related-artists`,
        fetchCondition: !!mainArtistData.id,
        dependencies: [trackID],
    });

    const { datas: mainArtistAllReleasesData, datasStatus: mainArtistAllReleasesDataStatus } = useDependentFetchAPI({
        endpoint: `artists/${mainArtistData.id}/${allReleasesEndpointResource}`,
        fetchCondition: !!mainArtistData.id,
        dependencies: [trackID],
    });

    const mainArtistAllReleasesItemsList = mainArtistAllReleasesData?.items;

    const mainArtistAlbums = filterByAlbumGroup(mainArtistAllReleasesItemsList, "album");
    const mainArtistSingles = filterByAlbumGroup(mainArtistAllReleasesItemsList, "single");

    const popularReleases = [...topTracksAsAlbumsList || [], ...mainArtistAllReleasesItemsList || []];

    const mainArtistGroupedReleasesList = [
        { type: "Releases", list: removeDuplicates(popularReleases, "name"), listId: 1 },
        { type: "Albums", list: mainArtistAlbums, listId: 2 },
        { type: "Singles and EP's", list: mainArtistSingles, listId: 3 },
    ];

    const [secondaryArtistsAllReleasesList, setArtistsAlbumsDatasList] = useState(undefined);
    const [secondaryArtistsAllReleasesListStatus, setArtistsAlbumsDatasListStatus] = useState(initial);

    useEffect(() => {
        const fetchArtistsAlbumsList = async () => {
            if (secondaryArtistsIdsList && accessToken) {
                try {
                    setArtistsAlbumsDatasListStatus(loading);
                    const responses = await Promise.all(secondaryArtistsIdsList.map(id => {
                        return fetchFromAPI({
                            endpoint: `artists/${id}/albums?include_groups=album%2Csingle%2Ccompilation&limit=50`,
                            accessToken
                        })
                    }));

                    setArtistsAlbumsDatasListStatus(success);
                    setArtistsAlbumsDatasList(
                        secondaryArtistsIdsList.map((artistId, index) => ({
                            id: artistId,
                            name: rawArtistsDatasList.artists.find(artist => artist.id === artistId)?.name || '',
                            list: responses[index]?.items || []
                        }))
                    );
                } catch {
                    setArtistsAlbumsDatasListStatus(error);
                }
            }
        };
        fetchArtistsAlbumsList();
    }, [trackID, accessToken, rawArtistsDatasList]);

    const fetchStatus = useFetchStatus([
        rawArtistTopTracksDatasStatus,
        artistsDatasListStatus,
        trackDataStatus,
        // lyricsFetchStatus,
        secondaryArtistsAllReleasesListStatus,
        mainArtistAllReleasesDataStatus,
        trackRecommandationsDatasListStatus,
        relatedArtistsListStatus,
    ]);

    const metaDatasContent = renderMetaDatasContent({
        releaseDate: getYear(albumData.release_date),
        duration: fromMillisecondsToMinutes(formattedTrackData.duration_ms).replace(".", ":"),
        uniqueData: `${formattedTrackData.popularity}/100`
    });

    const subTitleContent = renderSubTitleContent({
        albumDetails: {
            id: albumData.id,
            name: albumData.name,
        },
        mainArtistDetails: {
            id: mainArtistData.id,
            name: mainArtistData.name,
        },
        artistImage: getImage(mainArtistData.images),
    });

    return (
        <>
            <Main
                fetchStatus={fetchStatus}
                bannerContent={
                    <Banner
                        picture={getImage(albumData.images)}
                        title={formattedTrackData.name}
                        caption={formattedTrackData.type}
                        subTitleContent={subTitleContent}
                        metaDatas={metaDatasContent}
                    />
                }
                content={
                    <>
                        <LyricsAndArtistsCardSectionContainer>
                            <LyricsSection>
                                {lyrics}
                                {/* {formatLyrics(hideRestLyrics ? lyricsPreview : lyrics)} */}
                                {/* <ToggleViewButton
                                    onClick={() => setHideRestLyrics(hideRestLyrics => !hideRestLyrics)}
                                >
                                    {hideRestLyrics ? "...Show more" : "Show less lyrics"}
                                </ToggleViewButton> */}
                            </LyricsSection>
                            <ArtistCardSection>
                                {
                                    rawArtistsDatasList.artists?.map(({ id, name, type, images }) => (
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
                            list={rawTrackRecommandationsDatasList}
                            caption="Recommended"
                            subCaption="Based on this song"
                            hideIndex
                        />
                        <Table
                            list={topTracksDatasList}
                            caption={mainArtistData.name}
                        />
                        {
                            mainArtistGroupedReleasesList?.map(({ type, list, listId }) => (
                                <TilesList
                                    title={`Popular ${type} by ${mainArtistData.name}`}
                                    list={list}
                                    renderItem={({ images, name, type, id }, index) => (
                                        <Tile
                                            isActive={isTileActive(index, listId)}
                                            mouseEventHandlers={{
                                                enter: () => setActiveTile({
                                                    activeTileIndex: index,
                                                    activeTilesListID: listId,
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
                                            id: mainArtistData.id,
                                            additionalPath: allReleaseDiscography,
                                        }),
                                        text: fullListLinkText,
                                    }}
                                />
                            ))
                        }
                        {
                            secondaryArtistsAllReleasesList?.map(({ list, name, id }, albumIndex) => (
                                <TilesList
                                    title={name}
                                    list={list}
                                    renderItem={({ images, name, type, id }, index) => (
                                        <Tile
                                            isActive={isTileActive(index, albumIndex)}
                                            mouseEventHandlers={{
                                                enter: () => setActiveTile({
                                                    activeTileIndex: index,
                                                    activeTilesListID: albumIndex,
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
                                            id,
                                            additionalPath: allReleaseDiscography,
                                        }),
                                        text: fullListLinkText,
                                    }}
                                />
                            ))
                        }
                        < TilesList
                            title="Fans also like"
                            list={relatedArtistsList?.artists}
                            renderItem={({ images, name, type, id }, index) => (
                                <Tile
                                    isActive={isTileActive(index, 4)}
                                    mouseEventHandlers={{
                                        enter: () => setActiveTile({
                                            activeTileIndex: index,
                                            activeTilesListID: 4,
                                        }),
                                        leave: () => setActiveTile({
                                            activeTileIndex: undefined,
                                            activeTilesListID: undefined,
                                        }),
                                    }}
                                    key={nanoid()}
                                    picture={getImage(images)}
                                    title={name}
                                    subInfo={type || ""}
                                    toPage={toArtist({ id })}
                                    isArtistPictureStyle
                                />
                            )}
                            hideRestListPart
                            fullListData={{
                                pathname: toArtist({ id: mainArtistData.id, additionalPath: relatedArtistsParam }),
                                text: fullListLinkText
                            }}
                        />
                    </>
                }
            />
        </>
    )
};