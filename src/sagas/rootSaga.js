import { all } from "redux-saga/effects";
import { artistsSaga } from "./artistsSaga";
import { albumsSaga } from "./albumsSaga";
import { artistSaga } from "./artistSaga";
import { artistTopTracksSaga } from "./artistTopTracksSaga";
import { artistAlbumssSaga } from "./artistAlbumsSaga";

export function* rootSaga() {
    yield all([
        artistsSaga(),
        albumsSaga(),
        artistSaga(),
        artistTopTracksSaga(),
        artistAlbumssSaga(),
    ]);
};