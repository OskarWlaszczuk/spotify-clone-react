import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { Table } from "../../../../common/components/Table";
import { allReleaseDiscography } from "../../../../common/constants/params";
import { Copyrights } from "../../../../common/components/Copyrights";
import { getArtistReleasesEndpointResource } from "../../../../common/functions/getArtistReleasesEndpointResource";
import { getImage } from "../../../../common/functions/getImage";
import { useDependentFetchAPI } from "../../../../common/hooks/useDependentFetchAPI";
import { renderMetaDatasContent } from "../../../../common/functions/renderMetaDatasContent";
import { useAlbumDetails } from "../../hooks/useAlbumDetails";
import { calculateTotalDuration } from "../../functions/calculateTotalDuration";
import { getUniqueDiscNumbers } from "../../functions/getUniqueDiscNumbers";
import { renderSubTitleContent } from "../../../../common/functions/renderSubTitleContent";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";


const useAlbumDependentApiData = () => {

}

export const AlbumPage = () => {
    const { id: albumId } = useParams();

    const renderTilesList = useRenderTilesList();

    const { filteredAlbumData, albumDetailsStatus } = useAlbumDetails(albumId);

    const {
        name,
        images,
        type,
        release_date,
        copyrights,
        total_tracks,
        tracks,
        artists: artistsList,
    } = filteredAlbumData;

    const isAlbumArtistsListLengthEqualsOne = artistsList?.length === 1;

    const mainArtistId = artistsList?.[0].id;
    const isMainArtistIdExists = !!mainArtistId

    const apiDependencies = [albumId, mainArtistId];

    const {
        depentendApiDatas: rawMainArtistData,
        depentendApiDatasStatus: rawMainArtistDataStatus
    } = useDependentFetchAPI({
        endpointsList: [{ endpoint: `artists/${mainArtistId}` }],
        fetchCondition: isAlbumArtistsListLengthEqualsOne && isMainArtistIdExists,
        dependencies: apiDependencies,
    });

    const {
        depentendApiDatas: rawAllReleasesList,
        depentendApiDatasStatus: allReleasesListStatus
    } = useDependentFetchAPI({
        endpointsList: [{ endpoint: `artists/${mainArtistId}/${getArtistReleasesEndpointResource()}` }],
        fetchCondition: isMainArtistIdExists,
        dependencies: apiDependencies,
    });

    const mainArtistImage = rawMainArtistData?.[0].images
    const mainArtistName = rawMainArtistData?.[0].name
    const mainArtistAllReleasesList = rawAllReleasesList?.[0].items;

    const fetchStatus = useFetchStatus([
        albumDetailsStatus,
        allReleasesListStatus,
        ...(isAlbumArtistsListLengthEqualsOne ? [rawMainArtistDataStatus] : []),
    ]);

    const metaDatasContent = renderMetaDatasContent({
        releaseDate: release_date,
        duration: calculateTotalDuration(tracks?.items),
        uniqueData: `${total_tracks} songs`
    });
    const subTitleContent = renderSubTitleContent({
        artistsList: artistsList,
        isAlbumArtistsListLengthEqualsOne,
        artistImage: getImage(mainArtistImage),
    });

    return (
        <Main
            fetchStatus={fetchStatus}
            bannerContent={
                <Banner
                    picture={getImage(images)}
                    subTitleContent={subTitleContent}
                    metaDatas={metaDatasContent}
                    title={name}
                    caption={type}
                />
            }
            content={
                <>
                    <Table list={tracks?.items} useAlbumView discsNumbers={getUniqueDiscNumbers(tracks?.items)} />
                    <Copyrights date={release_date} copyrights={copyrights} />
                    {
                        renderTilesList([
                            {
                                title: `More by ${mainArtistName}`,
                                list: mainArtistAllReleasesList,
                                toPageFunction: toAlbum,
                                fullListData: {
                                    pathname: toArtist({
                                        id: mainArtistId,
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