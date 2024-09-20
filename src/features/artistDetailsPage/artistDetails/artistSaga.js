import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchArtist, fetchArtistSuccess, fetchArtistError } from './artistSlice';
import { fetchFromAPI } from  "../../../common/functions/fetchFromAPI";
import { BASE_URL } from  "../../../common/constants/config";

function* fetchArtistHandler(action) {
    try {
        const response = yield call(fetchFromAPI, `${BASE_URL}artists/${action.payload}`);
        yield put(fetchArtistSuccess(response));
    } catch {
        yield put(fetchArtistError());
    }
};

export function* artistSaga() {
    yield takeLatest(fetchArtist.type, fetchArtistHandler);
};