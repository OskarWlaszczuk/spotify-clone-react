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
import { getAlbumArtists } from "../../../../common/functions/getAlbumArtists";
import { isNotEmpty } from "../../../../common/functions/isNotEmpty";
import { artistDetailsActions, artistDetailsSelectors } from "../../../artistDetailsPage/slices/artistDetailsSlice";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../../artistDetailsPage/slices/artistAlbumsSlice";
import { allParamDiscography } from "../../../artistDetailsPage/constants/params";

export const AlbumPage = () => {

    const removeDuplicates = (list = []) => {
        const caughtDuplicates = new Set();

        return list.filter(disc => {
            const keyValue = disc;
            return !caughtDuplicates.has(keyValue) && caughtDuplicates.add(keyValue);
        });
    };

    const { albumID, artistID } = useParams();

    const { fetch: fetchAlbumDetails, clear: clearAlbumDetails } = albumDetailsActions;
    const { fetch: fetchMainArtistDetails, clear: clearMainArtistDetails } = artistDetailsActions;
    const { fetch: fetchMainArtistAlbumsList, clear: clearMainArtistAlbumsList } = artistAlbumsActions;

    useFetchAPI([
        { fetchAction: fetchAlbumDetails, clearAction: clearAlbumDetails, endpoint: `albums/${albumID}` },
        { fetchAction: fetchMainArtistDetails, clearAction: clearMainArtistDetails, endpoint: `artists/${artistID}` },
        { fetchAction: fetchMainArtistAlbumsList, clearAction: clearMainArtistAlbumsList, endpoint: `artists/${artistID}/albums?include_groups=album%2Csingle%2Ccompilation` },
    ], [albumID, artistID]);

    const albumDetailsStatus = useSelector(albumDetailsSelectors.selectStatus);
    const albumDetails = useSelector(albumDetailsSelectors.selectDatas)?.datas;

    const mainArtistDetailsStatus = useSelector(artistDetailsSelectors.selectStatus);
    const mainArtistDetails = useSelector(artistDetailsSelectors.selectDatas)?.datas;

    const mainArtistAlbumsListStatus = useSelector(artistAlbumsSelectors.selectStatus);
    const mainArtistAlbumsList = useSelector(artistAlbumsSelectors.selectDatas)?.datas.items;

    const mainArtistName = mainArtistDetails?.name;
    const mainArtistImage = mainArtistDetails?.images[0].url;

    const albumArtistsList = albumDetails?.artists;
    const isAlbumArtistsListLengthEqualsOne = albumArtistsList?.length === 1;

    const albumImage = albumDetails?.images[0].url;
    const albumName = albumDetails?.name;
    const albumType = albumDetails?.album_type;
    const albumReleaseDate = getYear(albumDetails?.release_date);

    const albumTotalTracks = albumDetails?.total_tracks;
    const albumTracks = albumDetails?.tracks.items;
    const albumTrackDiscNumbers = removeDuplicates(albumTracks?.map(({ disc_number }) => disc_number));

    const albumTracksDurations = albumTracks?.map(({ duration_ms }) => duration_ms);
    const albumTotalDuration = fromMillisecondsToMinutes(albumTracksDurations?.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    const albumTotalDurationConverted = albumTotalDuration >= 60 ? convertMinutesToHours(albumTotalDuration) : convertToMinutesAndSeconds(albumTotalDuration);

    const metaDatasContent = [albumReleaseDate, `${albumTotalTracks} songs, ${albumTotalDurationConverted}`].join(" • ");
    const subTitleContent = albumArtistsList?.map(({ name, id }, index) => (
        <>
            {
                isAlbumArtistsListLengthEqualsOne && (
                    <AvatarImage
                        src={mainArtistImage}
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
    const fetchStatus = useFetchStatus([albumDetailsStatus, mainArtistDetailsStatus, mainArtistAlbumsListStatus]);

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
                    <Table list={albumTracks} useAlbumView discsNumbers={albumTrackDiscNumbers} />
                    {
                        isNotEmpty(mainArtistAlbumsList) && (
                            <TilesList
                                title={<>More by {mainArtistName}</>}
                                hideRestListPart
                                list={mainArtistAlbumsList.filter(({ name }) => name !== albumName)}
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
                                            picture={images[0].url}
                                            title={name}
                                            subInfo={getYear(release_date)}
                                            toPage={toAlbum({ albumID: id, artistID: artists[0].id })}
                                        />
                                    )
                                    )
                                }
                                fullListData={toArtist({ id: artistID, additionalPath: allParamDiscography })}
                            />
                        )
                    }
                </>
            }
        />
    );
};