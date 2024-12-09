import { albumDetailsActions } from "../slices/albumDetailsSlice";
import { createSaga } from "../functions/createSaga";
import { getAPI } from "../functions/getAPI";

export function* watchFetchAlbumDetailsSaga() {
    yield createSaga({
        getData: getAPI,
        actions: albumDetailsActions,
    });
};