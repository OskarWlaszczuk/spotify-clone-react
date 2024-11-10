import { useSelector } from "react-redux";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { albumDetailsActions, albumDetailsSelectors } from "../../slices/albumDetailsSlice";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { getYear } from "../../../../common/functions/getYear";
import { fromMillisecondsToMinutes } from "../../../../common/functions/fromMillisecondsToMinutes";
import { convertToMinutesAndSeconds } from "../../../../common/functions/convertToMinutesAndSeconds";
import { convertMinutesToHours } from "../../../../common/functions/convertMinutesToHours";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { ArtistNameLink } from "./styled";
import { Table } from "../../../../common/components/Table";
import { AvatarImage } from "../../../../common/components/AvatarImage";
import { TilesList } from "../../../../common/components/TilesList";
import { Tile } from "../../../../common/components/Tile";
import { useActiveTile } from "../../../../common/hooks/useActiveTile";
import { isNotEmpty } from "../../../../common/functions/isNotEmpty";
import { allReleaseDiscography } from "../../../../common/constants/params";
import { Copyrights } from "../../../../common/components/Copyrights";
import { removeDuplicates } from "../../../../common/functions/removeDuplicates";
import { allReleasesEndpointResource } from "../../../../common/constants/allReleasesEndpointResource";
import { getImage } from "../../../../common/functions/getImage";
import { selectAccessToken } from "../../../../common/slices/authSlice";
import { useDependentFetchAPI } from "../../../../common/hooks/useDependentFetchAPI";
import { renderMetaDatasContent } from "../../../../common/functions/renderMetaDatasContent";

export const AlbumPage = () => {
    const { albumID } = useParams();

    const accessToken = useSelector(selectAccessToken);

    const { fetch: fetchAlbumDetails, clear: clearAlbumDetails } = albumDetailsActions;

    useFetchAPI(
        [
            { fetchAction: fetchAlbumDetails, clearAction: clearAlbumDetails, endpoint: `albums/${albumID}` },
            // artistDetailsConfigs,
            // artistAllReleasesConfigs,
        ],
        [
            albumID,
            // artistID
        ]
    );

    const albumDetailsStatus = useSelector(albumDetailsSelectors.selectStatus);
    const albumDetails = useSelector(albumDetailsSelectors.selectDatas)?.datas;

    const albumArtistsList = albumDetails?.artists;
    const artistID = albumDetails?.artists[0].id;

    const isAlbumArtistsListLengthEqualsOne = albumArtistsList?.length === 1;
    const isArtistIdTruthy = !!artistID

    const { datas: artistImage, datasStatus: artistImageStatus } = useDependentFetchAPI({
        endpoint: `artists/${artistID}`,
        accessToken,
        fetchCondition: isAlbumArtistsListLengthEqualsOne && isArtistIdTruthy,
        dependencies: [albumID, artistID],
    });

    const { datas: allReleases, datasStatus: allReleasesStatus } = useDependentFetchAPI({
        endpoint: `artists/${artistID}/${allReleasesEndpointResource}`,
        accessToken,
        fetchCondition: isArtistIdTruthy,
        dependencies: [albumID, artistID],
    });
    console.log(allReleasesStatus, artistImageStatus, albumDetailsStatus)


    const albumCopyrights = albumDetails?.copyrights;
    const albumImage = getImage(albumDetails?.images);
    const albumName = albumDetails?.name;
    const albumType = albumDetails?.album_type;
    const albumReleaseDate = albumDetails?.release_date;

    const albumTotalTracks = albumDetails?.total_tracks;
    const albumTracks = albumDetails?.tracks.items;

    const albumTracksDiscNumbersDuplicatesList = albumTracks?.map(({ disc_number }) => disc_number);
    const uniqueAlbumTracksDiscNumbers = removeDuplicates(albumTracksDiscNumbersDuplicatesList);

    const albumTracksDurations = albumTracks?.map(({ duration_ms }) => duration_ms);
    const albumTotalDuration = fromMillisecondsToMinutes(albumTracksDurations?.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    const albumTotalDurationConverted = albumTotalDuration >= 60 ? convertMinutesToHours(albumTotalDuration) : convertToMinutesAndSeconds(albumTotalDuration);

    const metaDatasContent = renderMetaDatasContent(
        albumReleaseDate,
        albumTotalDurationConverted,
        `${albumTotalTracks} songs`
    );

    const subTitleContent = albumArtistsList?.map(({ name, id }, index) => (
        <>
            {
                isAlbumArtistsListLengthEqualsOne && (
                    <AvatarImage
                        $picture={getImage(artistImage.images)}
                        alt={name}
                        title={name}
                        $smaller
                        $useArtistPictureStyle
                    />
                )
            }
            {" "}{index !== 0 && "• "}<ArtistNameLink to={toArtist({ id })}>{name}</ArtistNameLink>
        </>
    ));


    const { setActiveTile, isTileActive } = useActiveTile();
    const fetchStatus = useFetchStatus([
        albumDetailsStatus,
        allReleasesStatus
        // artistDetailsStatus,
        // artistAllReleasesStatus
    ]);

    return (
        <Main
            fetchStatus={fetchStatus}
            bannerContent={
                <Banner
                    picture={albumImage}
                    subTitleContent={subTitleContent}
                    metaDatas={metaDatasContent}
                    title={albumName}
                    caption={albumType}
                />
            }
            content={
                <>
                    <Table list={albumTracks} useAlbumView discsNumbers={uniqueAlbumTracksDiscNumbers} />
                    <Copyrights date={albumReleaseDate} copyrights={albumCopyrights} />
                    {
                        isNotEmpty(allReleases?.items) && (
                            <TilesList
                                title={<>More by {albumArtistsList?.[0].name}</>}
                                hideRestListPart
                                list={allReleases?.items.filter(({ name }) => name !== albumName)}
                                renderItem={
                                    (({ id, images, name, artists = [], release_date }, index) => (
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
                                            key={id}
                                            picture={getImage(images)}
                                            title={name}
                                            subInfo={getYear(release_date)}
                                            toPage={toAlbum({ albumID: id, artistID: artists[0].id })}
                                        />
                                    )
                                    )
                                }
                                fullListData={{
                                    pathname: toArtist({ id: artistID, additionalPath: allReleaseDiscography }),
                                    text: "Show discography"
                                }}
                            />
                        )
                    }
                </>
            }
        />
    );
};