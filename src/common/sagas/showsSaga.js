import { showsActions } from "../slices/showsSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchShowsSaga() {
    yield createSaga({
        getData: getApiResponse,
        actions: showsActions,
    });
};