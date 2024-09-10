import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchAlbums, fetchAlbumsError, fetchAlbumsSuccess } from '../slices/albumsSlice';
import { fetchApi } from '../fetchApi';
// import { BASE_URL } from "../config";

function* fetchAlbumsHandler() {
    try {
        const response = yield call(fetchApi, "albums.json");
        yield put(fetchAlbumsSuccess(response));
    } catch {
        yield put(fetchAlbumsError());
    }
}

export function* albumsSaga() {
    yield takeLatest(fetchAlbums.type, fetchAlbumsHandler);
}