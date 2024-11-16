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
import { useEffect, useState } from "react";
import { LyricsLine, LyricsSection } from "../MainContent/Lyrics/styled";
import { ArtistCardContainer, ArtistCardSection, LyricsAndArtistsCardSectionContainer, Paragraph, StyledLink, Text } from "../../../../common/components/ArtistCard";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { Picture } from "../../../../common/components/Picture";
import { useLyrics } from "../../hooks/useLyrics";
import { ToggleViewButton } from "../../../../common/components/ToggleViewButton";
import { trackRecommendationsActions, trackRecommendationsSelectors } from "../../slices/trackRecommendationsSlice";
import { Table } from "../../../../common/components/Table";
import { artistTopTracksActions, artistTopTracksSelectors } from "../../../artistDetailsPage/slices/artistTopTracksSlice";
import { albumsParamDiscography, allReleaseDiscography, relatedArtistsParam, singleParamDiscography } from "../../../../common/constants/params";
import { nanoid } from "nanoid";
import { Tile } from "../../../../common/components/Tile";
import { TilesList } from "../../../../common/components/TilesList";
import { useActiveTile } from "../../../../common/hooks/useActiveTile";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../../artistDetailsPage/slices/artistAlbumsSlice";
import { relatedArtistsActions, relatedArtistsSelectors } from "../../../artistDetailsPage/slices/relatedArtistsSlice";
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


const getSpecificKeys = (object, keysToGetList) => {
    const objectArray = Array.isArray(object) ? object : [object];

    const getNestedKey = (object, nestedKeyToGet) => {
        return nestedKeyToGet.split('.').reduce(
            (currentObjectKey, keyToGet) => currentObjectKey && currentObjectKey[keyToGet], object
        );
    };

    return objectArray.map((objectKey) => {
        const selectedKeys = {};
        keysToGetList.forEach(key => {
            const selectedKeyValue = getNestedKey(objectKey, key);
            if (selectedKeyValue !== undefined) {
                selectedKeys[key] = selectedKeyValue;
            }
        });
        return selectedKeys;
    })[0];
};

const formatLyrics = (lyrics) => {
    return lyrics?.split('\n').map((line, index) => (
        <LyricsLine key={index}>{line}</LyricsLine>
    ));
};

export const TrackDetailsPage = () => {
    const { trackID } = useParams();
    const accessToken = useSelector(selectAccessToken);

    const { setActiveTile, isTileActive } = useActiveTile();

    const rawTrackDetails = useSelector(trackDetailsSelectors.selectDatas)?.datas;
    const trackDetailsStatus = useSelector(trackDetailsSelectors.selectStatus);

    const { fetch: fetchTrackDetails, clear: clearTrackDetails } = trackDetailsActions;
    const { fetch: fetchTrackRecommandations, clear: clrearTrackRecommandations } = trackRecommendationsActions;

    useFetchAPI(
        [
            { fetchAction: fetchTrackDetails, clearAction: clearTrackDetails, endpoint: `tracks/${trackID}` },
            { fetchAction: fetchTrackRecommandations, clearAction: clrearTrackRecommandations, endpoint: `recommendations?limit=10&seed_tracks=${trackID}` },
        ],
        [trackID]
    );

    const artistsIds = rawTrackDetails?.artists.map(({ id }) => id);
    const secondaryArtistIds = artistsIds?.slice(1);

    const { datas: rawArtistsDetailsList, datasStatus: artistsDetailsListStatus } = useDependentFetchAPI({
        endpoint: `artists?ids=${artistsIds}`,
        fetchCondition: !!artistsIds,
        dependencies: [trackID],
    });

    const formattedTrackDetails = getSpecificKeys(rawTrackDetails, ["name", "type", "id", "duration_ms", "popularity", "artists"]);
    const albumData = getSpecificKeys(rawTrackDetails?.album, ["name", "release_date", "id", "images"]);
    const mainArtistData = getSpecificKeys(rawArtistsDetailsList.artists?.[0], ["name", "id", "images"]);

    const { lyrics, lyricsFetchStatus } = useLyrics(mainArtistData.name, formattedTrackDetails.name);
    const [hideRestLyrics, setHideRestLyrics] = useState(true);
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

    const [secondaryArtistsAllReleasesList, setArtistsAlbumsDatasList] = useState(undefined);
    const [secondaryArtistsAllReleasesListStatus, setArtistsAlbumsDatasListStatus] = useState(initial);

    useEffect(() => {
        const fetchArtistsAlbumsList = async () => {
            if (secondaryArtistIds && accessToken) {
                try {
                    setArtistsAlbumsDatasListStatus(loading);
                    const responses = await Promise.all(secondaryArtistIds.map(id => {
                        return fetchFromAPI({
                            endpoint: `artists/${id}/albums?include_groups=album%2Csingle%2Ccompilation&limit=50`,
                            accessToken
                        })
                    }));

                    setArtistsAlbumsDatasListStatus(success);
                    setArtistsAlbumsDatasList(
                        secondaryArtistIds.map((artistId, index) => ({
                            id: artistId,
                            name: rawArtistsDetailsList.artists.find(artist => artist.id === artistId)?.name || '',
                            list: responses[index]?.items || []
                        }))
                    );
                } catch {
                    setArtistsAlbumsDatasListStatus(error);
                }
            }
        };
        fetchArtistsAlbumsList();
    }, [trackID, accessToken, rawArtistsDetailsList]);

    const fetchStatus = useFetchStatus([
        artistsDetailsListStatus,
        trackDetailsStatus,
        lyricsFetchStatus,
        secondaryArtistsAllReleasesListStatus,
    ]);

    // const {
    //     configs: artistAlbumsConfigs,
    //     status: artistAlbumsStatus,
    //     datas: artistAlbums
    // } = useApiData(
    //     artistAlbumsActions,
    //     artistAlbumsSelectors,
    //     `artists/${mainArtistID}/albums?include_groups=single%2Calbum&limit=50`
    // );

    // const {
    //     configs: topTracksConfigs,
    //     status: topTracksStatus,
    //     datas: topTracks
    // } = useApiData(artistTopTracksActions, artistTopTracksSelectors, `artists/${mainArtistID}/top-tracks`);

    // const mainArtistReleases = artistAlbums?.items;

    // const mainArtistAlbums = filterByAlbumGroup(mainArtistReleases, "album");
    // const mainArtistSingles = filterByAlbumGroup(mainArtistReleases, "single");

    // const trackRecommandationsStatus = useSelector(trackRecommendationsSelectors.selectStatus);
    // const trackRecommandations = useSelector(trackRecommendationsSelectors.selectDatas)?.datas.tracks;

    // const album = {
    //     name: trackDetails?.album.name,
    //     image: getImage(trackDetails?.album.images),
    //     releaseDate: trackDetails?.album.release_date,
    //     id: trackDetails?.album.id,
    // };


    // const artists = {
    //     artistsList: artistsDetails?.artists,
    // };
    // const mainArtist = {
    //     name: artistsDetails?.artists[0].name,
    //     id: artistsDetails?.artists[0].id,
    //     image: getImage(artistsDetails?.artists[0].images),
    // };

    const metaDatasContent = renderMetaDatasContent({
        releaseDate: getYear(albumData.release_date),
        duration: fromMillisecondsToMinutes(formattedTrackDetails.duration_ms).replace(".", ":"),
        uniqueData: `${formattedTrackDetails.popularity}/100`
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
                        title={formattedTrackDetails.name}
                        caption={formattedTrackDetails.type}
                        subTitleContent={subTitleContent}
                        metaDatas={metaDatasContent}
                    />
                }
                content={
                    <>
                        <LyricsAndArtistsCardSectionContainer>
                            <LyricsSection>
                                {formatLyrics(hideRestLyrics ? lyricsPreview : lyrics)}
                                <ToggleViewButton
                                    onClick={() => setHideRestLyrics(hideRestLyrics => !hideRestLyrics)}
                                >
                                    {hideRestLyrics ? "...Show more" : "Show less lyrics"}
                                </ToggleViewButton>
                            </LyricsSection>
                            <ArtistCardSection>
                                {
                                    rawArtistsDetailsList.artists?.map(({ id, name, type, images }) => (
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
                        <TilesList
                            title={mainArtistData.name}
                            list={mainArtistAllReleasesItemsList}
                            renderItem={({ images, name, type, id }, index) => (
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
                                    id: mainArtistData.id,
                                    additionalPath: allReleaseDiscography,
                                }),
                                text: fullListLinkText,
                            }}
                        />
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

                        {/* <Table
                            list={trackRecommandations}
                            caption="Recommended"
                            subCaption="Based on this song"
                            hideIndex
                        />
                        <Table
                            list={topTracks?.tracks}
                            caption={mainArtist.name}
                        /> */}
                        {/* < TilesList
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
                        /> */}
                    </>
                }
            />
        </>
    )
};