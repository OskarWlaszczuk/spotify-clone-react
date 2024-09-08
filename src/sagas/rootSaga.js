import { all } from "redux-saga/effects";
import { artistsSaga } from "./artistsSaga";


export function* rootSaga() {
    yield all([
        artistsSaga()
    ]);
};