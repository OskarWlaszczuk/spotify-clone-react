import { createSaga } from "../../../common/functions/createSaga";
import { getArtistSingles } from "./getArtistSingles";
import { artistSinglesActions } from "./artistSinglesSlice";

export function* watchFetchArtistSinglesSaga() {
    yield createSaga({
        getDatas: getArtistSingles,
        actions: artistSinglesActions,
    });
};