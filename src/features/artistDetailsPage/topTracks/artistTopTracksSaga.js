import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchArtistTopTracks, fetchArtistTopTracksError, fetchArtistTopTracksSuccess } from './artistTopTracksSlice';
import { fetchFromAPI } from  "../../../common/functions/fetchFromAPI";
import { BASE_URL } from  "../../../common/constants/config";

function* fetchArtistTopTracksHandler(action) {
    try {
        const response = yield call(fetchFromAPI, `${BASE_URL}artists/${action.payload}/top-tracks`);
        yield put(fetchArtistTopTracksSuccess(response));
    } catch {
        yield put(fetchArtistTopTracksError());
    }
}

export function* artistTopTracksSaga() {
    yield takeLatest(fetchArtistTopTracks.type, fetchArtistTopTracksHandler);
}