import { albumDetailsActions } from "../slices/albumDetailsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchAlbumDetailsSaga() {
    yield createSaga({
        getData: getAPI,
        actions: albumDetailsActions,
    });
};