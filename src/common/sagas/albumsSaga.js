import { albumsActions } from "../slices/albumsSlice";
import { createSaga } from  "../functions/createSaga";
import { getAPI } from "../functions/getAPI";

export function* watchFetchAlbumsSaga() {
    yield createSaga({
        getData: getAPI,
        actions: albumsActions,
    });
};