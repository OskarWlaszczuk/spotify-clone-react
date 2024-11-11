import { useSelector } from "react-redux";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { getYear } from "../../../../common/functions/getYear";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { ArtistNameLink } from "./styled";
import { Table } from "../../../../common/components/Table";
import { AvatarImage } from "../../../../common/components/AvatarImage";
import { TilesList } from "../../../../common/components/TilesList";
import { Tile } from "../../../../common/components/Tile";
import { useActiveTile } from "../../../../common/hooks/useActiveTile";
import { allReleaseDiscography } from "../../../../common/constants/params";
import { Copyrights } from "../../../../common/components/Copyrights";
import { allReleasesEndpointResource } from "../../../../common/constants/allReleasesEndpointResource";
import { getImage } from "../../../../common/functions/getImage";
import { selectAccessToken } from "../../../../common/slices/authSlice";
import { useDependentFetchAPI } from "../../../../common/hooks/useDependentFetchAPI";
import { renderMetaDatasContent } from "../../../../common/functions/renderMetaDatasContent";
import { useAlbumDetails } from "../../hooks/useAlbumDetails";
import { calculateTotalDuration } from "../../functions/calculateTotalDuration";
import { getUniqueDiscNumbers } from "../../functions/getUniqueDiscNumbers";

export const AlbumPage = () => {
    const { albumID } = useParams();

    const accessToken = useSelector(selectAccessToken);

    const { formattedAlbumDetails, albumDetailsStatus } = useAlbumDetails(albumID);

    const isAlbumArtistsListLengthEqualsOne = formattedAlbumDetails.artistsList?.length === 1;

    const artistID = formattedAlbumDetails.artistsList?.[0].id;
    const isArtistIdExists = !!artistID

    const { datas: artistImage, datasStatus: artistImageStatus } = useDependentFetchAPI({
        endpoint: `artists/${artistID}`,
        accessToken,
        fetchCondition: isAlbumArtistsListLengthEqualsOne && isArtistIdExists,
        dependencies: [albumID, artistID],
    });

    const { datas: allReleasesDetailsList, datasStatus: allReleasesDetailsListStatus } = useDependentFetchAPI({
        endpoint: `artists/${artistID}/${allReleasesEndpointResource}`,
        accessToken,
        fetchCondition: isArtistIdExists,
        dependencies: [albumID, artistID],
    });

    const { setActiveTile, isTileActive } = useActiveTile();

    const fetchStatus = useFetchStatus([
        albumDetailsStatus,
        allReleasesDetailsListStatus,
        ...(isAlbumArtistsListLengthEqualsOne ? [artistImageStatus] : []),
    ]);


    const metaDatasContent = renderMetaDatasContent(
        formattedAlbumDetails.releaseDate,
        calculateTotalDuration(formattedAlbumDetails.tracksList),
        `${formattedAlbumDetails.totalTracksNumber} songs`
    );

    const subTitleContent = formattedAlbumDetails.artistsList?.map(({ name, id }, index) => (
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

    return (
        <Main
            fetchStatus={fetchStatus}
            bannerContent={
                <Banner
                    picture={formattedAlbumDetails.image}
                    subTitleContent={subTitleContent}
                    metaDatas={metaDatasContent}
                    title={formattedAlbumDetails.name}
                    caption={formattedAlbumDetails.type}
                />
            }
            content={
                <>
                    <Table list={formattedAlbumDetails.tracksList} useAlbumView discsNumbers={getUniqueDiscNumbers(formattedAlbumDetails.tracksList)} />
                    <Copyrights date={formattedAlbumDetails.releaseDate} copyrights={formattedAlbumDetails.copyrights} />
                    <TilesList
                        title={<>More by {formattedAlbumDetails.artistsList?.[0].name}</>}
                        hideRestListPart
                        list={allReleasesDetailsList?.items}
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
                </>
            }
        />
    );
};