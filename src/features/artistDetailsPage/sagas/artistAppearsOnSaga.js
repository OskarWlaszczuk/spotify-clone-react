import { artistAppearsOnActions } from "../slices/artistAppearsOnSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchArtistAppearsOnSaga() {
    yield createSaga({
        getDatas: getAPI,
        actions: artistAppearsOnActions,
    });
};