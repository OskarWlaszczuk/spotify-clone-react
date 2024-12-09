import { trackDetailsActions } from "../slices/trackDetailsSlice";
import { createSaga } from "../functions/createSaga";
import { getAPI } from "../functions/getAPI";

export function* watchFetchTrackDetails() {
    yield createSaga({
        getData: getAPI,
        actions: trackDetailsActions,
    });
};