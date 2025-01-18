import { showDetailsActions } from "../slices/showDetailsSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchShowDetailsSaga() {
    yield createSaga({
        getData: getApiResponse,
        actions: showDetailsActions,
    });
};