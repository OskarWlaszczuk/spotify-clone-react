import { artistDetailsActions } from "../slices/artistDetailsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchArtistDetails() {
    yield createSaga({
        getData: getAPI,
        actions: artistDetailsActions,
    });
};