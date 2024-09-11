import { all } from "redux-saga/effects";
import { artistsSaga } from "./artistsSaga";
import { albumsSaga } from "./albumsSaga";
import { artistSaga } from "./artistSaga";

export function* rootSaga() {
    yield all([
        artistsSaga(),
        albumsSaga(),
        artistSaga(),
    ]);
};