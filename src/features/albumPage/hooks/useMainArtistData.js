import { useMemo } from "react";
import { getArtistReleasesEndpointResource } from "../../../common/functions/getArtistReleasesEndpointResource";
import { useDependentFetchAPI } from "../../../common/hooks/useDependentFetchAPI";
import { useMemoizeEndpointsList } from "../../../common/hooks/useMemoizeEndpointsList";

export const useMainArtistData = ({ mainArtistId, fetchCondition, dependencies, isAlbumArtistsListLengthEqualsOne }) => {

    const mainArtistReleasesMemoizedEndpoint = useMemoizeEndpointsList(
        `artists/${mainArtistId}/${getArtistReleasesEndpointResource()}`,
        [mainArtistId, getArtistReleasesEndpointResource()]
    );
    const mainArtistMemoizedEndpoint = useMemoizeEndpointsList(`artists/${mainArtistId}`, [mainArtistId]);

    const memoizedMainArtistEndpointsList = useMemo(() => (
        [...mainArtistReleasesMemoizedEndpoint, ...mainArtistMemoizedEndpoint]
    ), [mainArtistReleasesMemoizedEndpoint, mainArtistMemoizedEndpoint]);

    const {
        depentendApiData: mainArtistData,
        depentendApiDataStatus: mainArtistDataStatus
    } = useDependentFetchAPI({
        endpointsList: (
            isAlbumArtistsListLengthEqualsOne ?
                memoizedMainArtistEndpointsList :
                mainArtistReleasesMemoizedEndpoint
        ),
        fetchCondition,
        dependencies,
    });

    const mainArtistAllReleasesList = mainArtistData?.[0]?.items;
    const mainArtistImage = mainArtistData?.[1]?.images;

    return { mainArtistImage, mainArtistAllReleasesList, mainArtistDataStatus };
};