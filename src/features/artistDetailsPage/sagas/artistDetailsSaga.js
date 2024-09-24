import { getArtistDetails } from "../API/getArtistDetails"
import { artistDetailsActions } from "../slices/artistDetailsSlice";
import { createSaga } from "../../../common/functions/createSaga";

export function* watchFetchArtistDetails() {
    yield createSaga({
        getDatas: getArtistDetails,
        actions: artistDetailsActions,
    });
};