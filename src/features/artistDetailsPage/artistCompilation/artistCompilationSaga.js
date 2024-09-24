import { getArtistCompilation } from "../API/getArtistCompilation"
import { createSaga } from "../../../common/functions/createSaga";
import { artistCompilationActions } from "./artistCompilationSlice";

export function* watchFetchArtistCompilationSaga() {
    yield createSaga({
        getDatas: getArtistCompilation,
        actions: artistCompilationActions,
    });
};