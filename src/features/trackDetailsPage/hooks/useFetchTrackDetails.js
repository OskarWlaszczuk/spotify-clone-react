import { getTrackDetailsEndpoint } from "../../../common/functions/endpoints";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../../common/slices/trackDetailsSlice";

export const useFetchTrackDetails = (trackId) => {
    const {
        configs: trackDataConfigs,
        apiStatus: trackDetailsStatus,
        rawApiData: trackDetails
    } = useApiResource({
        actions: trackDetailsActions,
        selectors: trackDetailsSelectors,
        endpoint: getTrackDetailsEndpoint({ id: trackId }),
    });

    useFetchAPI({
        fetchConfigs: [trackDataConfigs],
        dependencies: [trackId],
        pageId: trackId,
    });

    return { trackDetails, trackDetailsStatus };
};