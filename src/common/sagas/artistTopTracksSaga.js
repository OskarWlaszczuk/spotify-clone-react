import { artistTopTracksActions } from "../slices/artistTopTracksSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchArtistTopTracks() {
    yield createSaga({
        getData: getApiResponse,
        actions: artistTopTracksActions,
    });
};