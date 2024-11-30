import { useDependentFetchAPI } from "../../../common/hooks/useDependentFetchAPI";

export const useMainArtistData = ({ mainArtistId, fetchCondition, dependencies }) => {
    const {
        depentendApiData: rawMainArtistData,
        depentendApiDataStatus: mainArtistDataStatus
    } = useDependentFetchAPI({
        endpointsList: [{ endpoint: `artists/${mainArtistId}` }],
        fetchCondition,
        dependencies,
    });

    const mainArtistImage = rawMainArtistData?.[0].images;
    const mainArtistName = rawMainArtistData?.[0].name;

    return { mainArtistImage, mainArtistName, mainArtistDataStatus };
};