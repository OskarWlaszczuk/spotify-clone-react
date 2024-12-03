import { useMemo } from "react";
import { getArtistReleasesEndpointResource } from "../../../common/functions/getArtistReleasesEndpointResource";
import { useDependentFetchAPI } from "../../../common/hooks/useDependentFetchAPI";
import { useMemoizeEndpointsList } from "../../../common/hooks/useMemoizeEndpointsList";

export const useMainArtistData = ({ artistsList, albumId }) => {

    const mainArtistId = artistsList?.[0].id;
    const isMainArtistIdExists = !!mainArtistId

    const apiDependencies = [albumId, mainArtistId];

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
        endpointsList: memoizedMainArtistEndpointsList,
        fetchCondition:isMainArtistIdExists,
        dependencies: apiDependencies,
    });

    const mainArtistAllReleasesList = mainArtistData?.[0].items;
    const mainArtistDetails = mainArtistData?.[1];

    return { mainArtistDetails, mainArtistAllReleasesList, mainArtistDataStatus };
};