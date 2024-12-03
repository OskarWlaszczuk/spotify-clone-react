import { getArtistReleasesEndpointResource } from "../../../common/functions/getArtistReleasesEndpointResource";
import { useDependentFetchAPI } from "../../../common/hooks/useDependentFetchAPI";
import { useMemoizeEndpointsList } from "../../../common/hooks/useMemoizeEndpointsList";

export const useMainArtistReleases = ({ mainArtistId, fetchCondition, dependencies }) => {

    const mainArtistReleasesMemoizedEndpoint = useMemoizeEndpointsList(
        `artists/${mainArtistId}/${getArtistReleasesEndpointResource()}`,
        [mainArtistId, getArtistReleasesEndpointResource()]
    );

    const {
        depentendApiData: mainArtistAllReleases,
        depentendApiDataStatus: allReleasesListStatus
    } = useDependentFetchAPI({
        endpointsList: mainArtistReleasesMemoizedEndpoint,
        fetchCondition,
        dependencies,
    });

    const mainArtistAllReleasesList = mainArtistAllReleases?.[0].items;

    return { mainArtistAllReleasesList, allReleasesListStatus };
};