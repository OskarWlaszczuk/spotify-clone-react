import { getArtistAppearsOn } from "../API/getArtistAppearsOn"
import { artistAppearsOnActions } from "../slices/artistAppearsOnSlice";
import { createSaga } from "../../../common/functions/createSaga";

export function* watchFetchArtistAppearsOnSaga() {
    yield createSaga({
        getDatas: getArtistAppearsOn,
        actions: artistAppearsOnActions,
    });
};