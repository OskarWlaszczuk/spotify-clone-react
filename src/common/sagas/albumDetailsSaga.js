import { albumDetailsActions } from "../slices/albumDetailsSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";
import {AlbumItem} from "../Interfaces/AlbumItem";

export function* watchFetchAlbumDetailsSaga() {
    yield createSaga({
        getData:getApiResponse,
        actions: albumDetailsActions,
    });
};