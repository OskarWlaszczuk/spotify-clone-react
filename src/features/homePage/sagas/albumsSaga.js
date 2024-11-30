import { albumsActions } from "../slices/albumsSlice";
import { createSaga } from  "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchAlbumsSaga() {
    yield createSaga({
        getData: getAPI,
        actions: albumsActions,
    });
};