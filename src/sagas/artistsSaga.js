import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchArtists, fetchArtistsError, fetchArtistsSuccess } from '../slices/artistsSlice';
import { fetchApi } from '../fetchApi';
// import { BASE_URL } from "../config";

function* fetchArtistsHandler() {
    try {
        const response = yield call(fetchApi, "artists.json");
        yield put(fetchArtistsSuccess(response));
    } catch {
        yield put(fetchArtistsError());
    }
}

export function* artistsSaga() {
    yield takeLatest(fetchArtists.type, fetchArtistsHandler);
}