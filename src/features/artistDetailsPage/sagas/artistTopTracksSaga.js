import { artistTopTracksActions } from "../slices/artistTopTracksSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchArtistTopTracks() {
    yield createSaga({
        getData: getAPI,
        actions: artistTopTracksActions,
    });
};