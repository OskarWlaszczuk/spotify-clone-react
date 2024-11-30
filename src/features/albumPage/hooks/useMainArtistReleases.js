import { getArtistReleasesEndpointResource } from "../../../common/functions/getArtistReleasesEndpointResource";
import { useDependentFetchAPI } from "../../../common/hooks/useDependentFetchAPI";

export const useMainArtistReleases = ({ mainArtistId, fetchCondition, dependencies }) => {
    const {
        depentendApiData: mainArtistAllReleases,
        depentendApiDataStatus: allReleasesListStatus
    } = useDependentFetchAPI({
        endpointsList: [{ endpoint: `artists/${mainArtistId}/${getArtistReleasesEndpointResource()}` }],
        fetchCondition,
        dependencies,
    });

    const mainArtistAllReleasesList = mainArtistAllReleases?.[0].items;

    return { mainArtistAllReleasesList, allReleasesListStatus };
};