import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchArtist, fetchArtistSuccess, fetchArtistError } from '../slices/artistSlice';
import { fetchApi } from '../fetchApi';
import { BASE_URL } from "../config";

function* fetchArtistHandler(action) {
    try {
        const response = yield call(fetchApi, `${BASE_URL}artists/${action.payload}`);
        console.log(response)
        yield put(fetchArtistSuccess(response));
    } catch (error) {
        yield put(fetchArtistError());
        console.log(error)
    }
}

export function* artistSaga() {
    yield takeLatest(fetchArtist.type, fetchArtistHandler);
}