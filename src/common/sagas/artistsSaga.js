import { artistsActions } from "../slices/artistsSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchArtistsSaga() {
    yield createSaga({
        getData: getApiResponse,
        actions: artistsActions,
    });
};