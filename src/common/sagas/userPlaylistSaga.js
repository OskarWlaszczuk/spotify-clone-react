import { userPlaylistsActions } from "../slices/userPlaylistSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchUserPlaylistsSaga() {
    yield createSaga({
        getData: getApiResponse,
        actions: userPlaylistsActions,
    });
};