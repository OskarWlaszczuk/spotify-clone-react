import { createSaga } from "../../../common/functions/createSaga";
import { artistCompilationActions } from "../slices/artistCompilationSlice";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchArtistCompilationSaga() {
    yield createSaga({
        getData: getAPI,
        actions: artistCompilationActions,
    });
};