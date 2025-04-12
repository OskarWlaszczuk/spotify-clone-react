import { newReleasesActions } from "../slices/newReleasesSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchNewReleasesSaga() {
    yield createSaga({
        getData: getApiResponse,
        actions: newReleasesActions,
    });
};