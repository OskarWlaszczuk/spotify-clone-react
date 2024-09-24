import { createSaga } from "../../../common/functions/createSaga";
import { getArtistSingles } from "../API/getArtistSingles"
import { artistSinglesActions } from "../slices/artistSinglesSlice";

export function* watchFetchArtistSinglesSaga() {
    yield createSaga({
        getDatas: getArtistSingles,
        actions: artistSinglesActions,
    });
};