import { artistTopTracksActions } from "../slices/artistTopTracksSlice";
import { createSaga } from "../functions/createSaga";
import { getAPI } from "../functions/getAPI";

export function* watchFetchArtistTopTracks() {
    yield createSaga({
        getData: getAPI,
        actions: artistTopTracksActions,
    });
};