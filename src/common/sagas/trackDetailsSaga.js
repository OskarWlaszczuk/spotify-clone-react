import { trackDetailsActions } from "../slices/trackDetailsSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchTrackDetails() {
    yield createSaga({
        getData: getApiResponse,
        actions: trackDetailsActions,
    });
};