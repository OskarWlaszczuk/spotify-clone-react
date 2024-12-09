import { artistsActions } from "../slices/artistsSlice";
import { createSaga } from "../functions/createSaga";
import { getAPI } from "../functions/getAPI";

export function* watchFetchArtistsSaga() {
    yield createSaga({
        getData: getAPI,
        actions: artistsActions,
    });
};