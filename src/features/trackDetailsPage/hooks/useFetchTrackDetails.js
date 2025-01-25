import { getTrackDetailsEndpoint } from "../../../common/functions/endpoints";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../../common/slices/trackDetailsSlice";
import { getFilteredTrackData } from "../functions/getFilteredTrackData";

export const useFetchTrackDetails = (trackID) => {
    const {
        configs: trackDataConfigs,
        apiStatus: trackDetailsStatus,
        rawApiData: rawTrackDetails
    } = useApiResource({
        actions: trackDetailsActions,
        selectors: trackDetailsSelectors,
        endpoint: getTrackDetailsEndpoint({ id: trackID }),
    });

    useFetchAPI({
        fetchConfigs: [trackDataConfigs],
        pageID: trackID,
    });

    const { trackDetails, albumDetails } = getFilteredTrackData(rawTrackDetails);

    return { trackDetails, albumDetails, trackDetailsStatus };
};