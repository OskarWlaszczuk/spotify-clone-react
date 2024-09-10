import { all } from "redux-saga/effects";
import { artistsSaga } from "./artistsSaga";
import { albumsSaga } from "./albumsSaga";

export function* rootSaga() {
    yield all([
        artistsSaga(),
        albumsSaga()
    ]);
};