import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchArtistTopTracks, fetchArtistTopTracksError, fetchArtistTopTracksSuccess } from '../slices/artistTopTracksSlice';
import { fetchApi } from '../fetchApi';
import { BASE_URL } from '../config';

function* fetchArtistTopTracksHandler(action) {
    try {
        const response = yield call(fetchApi, `${BASE_URL}artists/${action.payload}/top-tracks`);
        yield put(fetchArtistTopTracksSuccess(response));
    } catch {
        yield put(fetchArtistTopTracksError());
    }
}

export function* artistTopTracksSaga() {
    yield takeLatest(fetchArtistTopTracks.type, fetchArtistTopTracksHandler);
}