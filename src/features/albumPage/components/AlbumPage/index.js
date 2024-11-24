import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { Table } from "../../../../common/components/Table";
import { useActiveTile } from "../../../../common/hooks/useActiveTile";
import { allReleaseDiscography } from "../../../../common/constants/params";
import { Copyrights } from "../../../../common/components/Copyrights";
import { allReleasesEndpointResource } from "../../../../common/constants/allReleasesEndpointResource";
import { getImage } from "../../../../common/functions/getImage";
import { useDependentFetchAPI } from "../../../../common/hooks/useDependentFetchAPI";
import { renderMetaDatasContent } from "../../../../common/functions/renderMetaDatasContent";
import { useAlbumDetails } from "../../hooks/useAlbumDetails";
import { calculateTotalDuration } from "../../functions/calculateTotalDuration";
import { getUniqueDiscNumbers } from "../../functions/getUniqueDiscNumbers";
import { renderSubTitleContent } from "../../../../common/functions/renderSubTitleContent";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";

export const AlbumPage = () => {
    const { id: albumId } = useParams();

    const renderTilesList = useRenderTilesList();

    const { formattedAlbumDetails, albumDetailsStatus } = useAlbumDetails(albumId);

    const isAlbumArtistsListLengthEqualsOne = formattedAlbumDetails.artistsList?.length === 1;

    const artistId = formattedAlbumDetails.artistsList?.[0].id;
    const isArtistIdExists = !!artistId

    const { depentendApiDatas: rawMainArtistData, depentendApiDatasStatus: rawMainArtistDataStatus } = useDependentFetchAPI({
        endpointsList: [{ endpoint: `artists/${artistId}` }],
        fetchCondition: isAlbumArtistsListLengthEqualsOne && isArtistIdExists,
        dependencies: [albumId, artistId],
    });

    const { depentendApiDatas: rawAllReleasesList, depentendApiDatasStatus: allReleasesListStatus } = useDependentFetchAPI({
        endpointsList: [{ endpoint: `artists/${artistId}/${allReleasesEndpointResource}` }],
        fetchCondition: isArtistIdExists,
        dependencies: [albumId, artistId],
    });

    const mainArtistImage = rawMainArtistData?.[0].images
    const allReleasesList = rawAllReleasesList?.[0].items;

    const fetchStatus = useFetchStatus([
        albumDetailsStatus,
        allReleasesListStatus,
        ...(isAlbumArtistsListLengthEqualsOne ? [rawMainArtistDataStatus] : []),
    ]);

    const metaDatasContent = renderMetaDatasContent({
        releaseDate: formattedAlbumDetails.releaseDate,
        duration: calculateTotalDuration(formattedAlbumDetails.tracksList),
        uniqueData: `${formattedAlbumDetails.totalTracksNumber} songs`
    });


    const subTitleContent = renderSubTitleContent({
        artistsList: formattedAlbumDetails.artistsList,
        isAlbumArtistsListLengthEqualsOne,
        artistImage: getImage(mainArtistImage),
    });

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
                    {
                        renderTilesList([
                            {
                                title: `More by ${formattedAlbumDetails.artistsList?.[0].name}`,
                                list: allReleasesList,
                                toPageFunction: toAlbum,
                                fullListData: {
                                    pathname: toArtist({
                                        id: artistId,
                                        additionalPath: allReleaseDiscography
                                    }),
                                    text: "Show discography"
                                },
                            }
                        ])
                    }
                </>
            }
        />
    );
};