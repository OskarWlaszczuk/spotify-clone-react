import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { Table } from "../../../../common/components/Table";
import { allReleaseDiscography } from "../../../../common/constants/params";
import { Copyrights } from "../../../../common/components/Copyrights";
import { getImage } from "../../../../common/functions/getImage";
import { renderMetaDatasContent } from "../../../../common/functions/renderMetaDatasContent";
import { useAlbumDetails } from "../../hooks/useAlbumDetails";
import { calculateTotalDuration } from "../../functions/calculateTotalDuration";
import { getUniqueDiscNumbers } from "../../functions/getUniqueDiscNumbers";
import { renderSubTitleContent } from "../../../../common/functions/renderSubTitleContent";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";
import { useMainArtistData } from "../../hooks/useMainArtistData";
import { useMainArtistReleases } from "../../hooks/useMainArtistReleases";

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

    const tracksList = tracks?.items;
    const isAlbumArtistsListLengthEqualsOne = artistsList?.length === 1;

    const mainArtistId = artistsList?.[0].id;
    const isMainArtistIdExists = !!mainArtistId

    const apiDependencies = [albumId, mainArtistId];

    const { mainArtistImage, mainArtistName, mainArtistDataStatus } = useMainArtistData({
        mainArtistId,
        fetchCondition: isAlbumArtistsListLengthEqualsOne && isMainArtistIdExists,
        dependencies: apiDependencies,
    });

    const { mainArtistAllReleasesList, allReleasesListStatus } = useMainArtistReleases({
        mainArtistId,
        fetchCondition: isMainArtistIdExists,
        dependencies: apiDependencies,
    });

    const fetchStatus = useFetchStatus([
        albumDetailsStatus,
        allReleasesListStatus,
        ...(isAlbumArtistsListLengthEqualsOne ? [mainArtistDataStatus] : []),
    ]);

    const renderBannerContent = ({
        metaData: {
            releaseDate,
            tracksList,
            uniqueData,
        },
        subTitleData: {
            artistImage,
            mainArtistDetails = null,
            albumDetails = null,
            artistsList = [],
        },
    }) => {
        const metaDataContent = renderMetaDatasContent({
            uniqueData,
            releaseDate,
            duration: calculateTotalDuration(tracksList),
        });

        const subTitleContent = renderSubTitleContent({
            artistsList,
            artistImage: getImage(artistImage),
            mainArtistDetails,
            albumDetails,
        });

        return { metaDataContent, subTitleContent };
    };

    const { metaDataContent, subTitleContent } = renderBannerContent({
        metaData: {
            tracksList,
            releaseDate: release_date,
            uniqueData: `${total_tracks} songs`,
        },
        subTitleData: {
            artistsList,
            artistImage: mainArtistImage,
        },
    });

    // const metaDatasContent = renderMetaDatasContent({
    //     releaseDate: release_date,
    //     duration: calculateTotalDuration(tracksList),
    //     uniqueData: `${total_tracks} songs`
    // });
    // const subTitleContent = renderSubTitleContent({
    //     artistsList: artistsList,
    //     isAlbumArtistsListLengthEqualsOne,
    //     artistImage: getImage(mainArtistImage),
    // });

    return (
        <Main
            fetchStatus={fetchStatus}
            bannerContent={
                <Banner
                    picture={getImage(images)}
                    subTitleContent={subTitleContent}
                    metaDatas={metaDataContent}
                    title={name}
                    caption={type}
                />
            }
            content={
                <>
                    <Table list={tracksList} useAlbumView discsNumbers={getUniqueDiscNumbers(tracksList)} />
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