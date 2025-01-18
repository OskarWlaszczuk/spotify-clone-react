import { albumsActions } from "../slices/albumsSlice";
import { createSaga } from  "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchAlbumsSaga() {
    yield createSaga({
        getData: getApiResponse,
        actions: albumsActions,
    });
};