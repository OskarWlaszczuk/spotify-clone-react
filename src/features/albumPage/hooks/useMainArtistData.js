import { useDependentFetchAPI } from "../../../common/hooks/useDependentFetchAPI";
import { useMemoizeEndpointsList } from "../../../common/hooks/useMemoizeEndpointsList";

export const useMainArtistData = ({ mainArtistId, fetchCondition, dependencies }) => {
    const mainArtistMemoizedEndpoint = useMemoizeEndpointsList(`artists/${mainArtistId}`, [mainArtistId]);

    const {
        depentendApiData: rawMainArtistData,
        depentendApiDataStatus: mainArtistDataStatus
    } = useDependentFetchAPI({
        endpointsList: mainArtistMemoizedEndpoint,
        fetchCondition,
        dependencies,
    });

    const mainArtistImage = rawMainArtistData?.[0].images;

    return { mainArtistImage, mainArtistDataStatus };
};