import {getArtistDetails} from "./getArtistDetails";
import { artistDetailsActions } from "./artistDetailsSlice";
import { createSaga } from "../../../common/functions/createSaga";

export function* watchFetchArtistDetails() {
    yield createSaga({
        getDatas: getArtistDetails,
        actions: artistDetailsActions,
    });
};