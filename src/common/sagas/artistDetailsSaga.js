import { artistDetailsActions } from "../slices/artistDetailsSlice";
import { createSaga } from "../functions/createSaga";
import { getAPI } from "../functions/getAPI";

export function* watchFetchArtistDetails() {
    yield createSaga({
        getData: getAPI,
        actions: artistDetailsActions,
    });
};