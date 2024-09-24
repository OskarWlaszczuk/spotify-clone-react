import { getArtistTopTracks } from "../API/getArtistTopTracks";
import { artistTopTracksActions } from "../slices/artistTopTracksSlice";
import { createSaga } from "../../../common/functions/createSaga";

export function* watchFetchArtistTopTracks() {
    yield createSaga({
        getDatas: getArtistTopTracks,
        actions: artistTopTracksActions,
    });
};