import { userPlaylistsActions } from "../slices/userPlaylistSlice";
import { createSaga } from "../functions/createSaga";
import { getAPI } from "../functions/getAPI";

export function* watchFetchUserPlaylistsSaga() {
    yield createSaga({
        getDatas: getAPI,
        actions: userPlaylistsActions,
    });
};