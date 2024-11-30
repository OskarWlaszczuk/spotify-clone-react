import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";
import { artistSinglesActions } from "../slices/artistSinglesSlice";

export function* watchFetchArtistSinglesSaga() {
    yield createSaga({
        getData: getAPI,
        actions: artistSinglesActions,
    });
};