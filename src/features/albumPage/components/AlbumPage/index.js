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
import { useEffect, useState } from "react";
import { error, initial, loading, success } from "../../../../common/constants/fetchStatuses";
import { fetchAccessToken } from "../../../../common/functions/fetchAccessToken";
import { fetchFromAPI } from "../../../../common/functions/fetchFromAPI";
import { AvatarImage } from "../../../../common/components/AvatarImage";
import { TilesList } from "../../../../common/components/TilesList";
import { Tile } from "../../../../common/components/Tile";
import { useActiveTile } from "../../../../common/hooks/useActiveTile";
import { getAlbumArtists } from "../../../../common/functions/getAlbumArtists";
import { isNotEmpty } from "../../../../common/functions/isNotEmpty";

export const AlbumPage = () => {

    const { id: albumID } = useParams();
    const { fetch: fetchAlbumDetails, clear: clearAlbumDetails } = albumDetailsActions;

    const [artistDatasFetchStatus, setAlbumArtistDatasFetchStatus] = useState(initial);
    const [artistDatas, setArtistDatas] = useState({ image: undefined, name: undefined, restArtistAlbumsList: undefined });

    const { name: artistName, image: artistImage, restArtistAlbumsList } = artistDatas;

    const removeDuplicates = (list = []) => {
        const caughtDuplicates = new Set();

        return list.filter(disc => {
            const keyValue = disc;
            return !caughtDuplicates.has(keyValue) && caughtDuplicates.add(keyValue);
        });
    };

    const albumDetailsStatus = useSelector(albumDetailsSelectors.selectStatus);
    const albumDetailsList = useSelector(albumDetailsSelectors.selectDatas)?.datas;

    useFetchAPI([{ fetchAction: fetchAlbumDetails, clearAction: clearAlbumDetails, endpoint: `albums/${albumID}` }]);

    const albumArtistsList = albumDetailsList?.artists;
    const albumArtistID = albumArtistsList?.map(({ id }) => id)[0];
    const isAlbumArtistsListLengthEqualsOne = albumArtistsList?.length === 1;

    const albumImage = albumDetailsList?.images[0].url;
    const albumName = albumDetailsList?.name;
    const albumType = albumDetailsList?.album_type;
    const albumReleaseDate = getYear(albumDetailsList?.release_date);

    const albumTotalTracks = albumDetailsList?.total_tracks;
    const albumTracks = albumDetailsList?.tracks.items;
    const albumTrackDiscNumbers = removeDuplicates(albumTracks?.map(({ disc_number }) => disc_number));

    const albumTracksDurations = albumTracks?.map(({ duration_ms }) => duration_ms);
    const albumTotalDuration = fromMillisecondsToMinutes(albumTracksDurations?.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    const albumTotalDurationConverted = albumTotalDuration >= 60 ? convertMinutesToHours(albumTotalDuration) : convertToMinutesAndSeconds(albumTotalDuration);

    const metaDatasContent = [albumReleaseDate, `${albumTotalTracks} songs, ${albumTotalDurationConverted}`].join(" • ");
    const subTitleContent = albumArtistsList?.map(({ name, id }, index) => (
        <>
            {isAlbumArtistsListLengthEqualsOne && (
                <AvatarImage
                    src={artistImage}
                    alt={name}
                    title={name}
                    $smaller
                    $useArtistPictureStyle
                />
            )}
            <ArtistNameLink to={toArtist({ id })}> {index !== 0 && " • "}{name} </ArtistNameLink>
        </>
    ));

    useEffect(() => {
        const fetchArtistsDetails = async () => {
            try {
                const accessToken = await fetchAccessToken();

                const response = await Promise.all([
                    fetchFromAPI({ endpoint: `artists?ids=${albumArtistID}`, accessToken }),
                    fetchFromAPI({ endpoint: `artists/${albumArtistID}/albums?include_groups=album%2Csingle%2Cappears_on%2Ccompilation`, accessToken })
                ]);

                setArtistDatas({ image: response[0].artists[0].images[0].url, name: response[0].artists[0].name, restArtistAlbumsList: response[1] });
                setAlbumArtistDatasFetchStatus(success);
            } catch {
                setAlbumArtistDatasFetchStatus(error);
            }
        };

        if (albumDetailsStatus === success) {
            fetchArtistsDetails();
        }
        setAlbumArtistDatasFetchStatus(loading)

    }, [albumDetailsList]);

    const { setActiveTile, isTileActive } = useActiveTile();
    const fetchStatus = useFetchStatus([albumDetailsStatus, artistDatasFetchStatus]);
    console.log(restArtistAlbumsList?.items)
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
                        isNotEmpty(restArtistAlbumsList?.items) && (
                            <TilesList
                                title={<>More by {artistName}</>}
                                hideRestListPart
                                list={restArtistAlbumsList?.items.filter(({ name }) => name !== albumName)}
                                renderItem={
                                    (({ id, images, name, artists = [] }, index) => (
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
                                            subInfo={getAlbumArtists(artists)}
                                            toPage={toAlbum({ id })}
                                        />
                                    )
                                    )
                                }
                            // fullListPathname={toAlbum({ additionalPath: popularAlbumsParam })}
                            />
                        )
                    }
                </>
            }
        />
    );
};