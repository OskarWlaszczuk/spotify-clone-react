import { getTrackDetailsEndpoint } from "../../../common/functions/endpoints";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { trackDetailsActions, trackDetailsSelectors } from "../../../common/slices/trackDetailsSlice";
import { getFilteredTrackData } from "../functions/getFilteredTrackData";

export const useFetchTrackDetails = (trackID) => {
    const { APIFetchStatus, APIData } = useFetchAPI({
        actions: trackDetailsActions,
        selectors: trackDetailsSelectors,
        endpoint: getTrackDetailsEndpoint({ id: trackID }),
    });

    const track = {
        details: getFilteredTrackData(APIData),
        status: APIFetchStatus,
    };

    return track;
};