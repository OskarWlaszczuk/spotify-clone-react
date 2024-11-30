import { trackDetailsActions } from "../slices/trackDetailsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchTrackDetails() {
    yield createSaga({
        getData: getAPI,
        actions: trackDetailsActions,
    });
};