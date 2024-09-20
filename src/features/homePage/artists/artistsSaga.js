import { artistsActions } from "../../homePage/artists/artistsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getArtists } from "./getArtists";

export function* watchFetchAsrtistsSaga() {
    yield createSaga({
        getDatas: getArtists,
        actions: artistsActions,
    });
};