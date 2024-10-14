import { artistsActions } from "../slices/artistsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchArtistsSaga() {
    yield createSaga({
        getDatas: getAPI,
        actions: artistsActions,
    });
};