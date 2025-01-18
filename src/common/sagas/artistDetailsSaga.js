import { artistDetailsActions } from "../slices/artistDetailsSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchArtistDetails() {
    yield createSaga({
        getData: getApiResponse,
        actions: artistDetailsActions,
    });
};