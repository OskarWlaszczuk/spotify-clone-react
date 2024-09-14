import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchArtistAlbums, fetchArtistAlbumsError, fetchArtistAlbumsSuccess } from '../slices/artistAlbumsSlice';
import { fetchApi } from '../fetchApi';
import { BASE_URL } from "../config";

function* fetchArtistAlbumsHandler(action) {
    try {
        const response = yield call(fetchApi, `${BASE_URL}artists/${action.payload}/albums?include_groups=album&limit=20`);
        yield put(fetchArtistAlbumsSuccess(response));
    } catch {
        yield put(fetchArtistAlbumsError());
    }
};

export function* artistAlbumssSaga() {
    yield takeLatest(fetchArtistAlbums.type, fetchArtistAlbumsHandler);
};