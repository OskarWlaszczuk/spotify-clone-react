import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchArtistRelatedArtists, fetchArtistRelatedArtistsError, fetchArtistRelatedArtistsSuccess } from './artistRelatedArtistsSlice';
import { fetchFromAPI } from '../../../common/functions/fetchFromAPI';
import { BASE_URL } from '../../../common/constants/config';

function* fetchArtistRelatedArtistsHandler(action) {
    try {
        const response = yield call(fetchFromAPI, `${BASE_URL}artists/${action.payload}/related-artists`);
        yield put(fetchArtistRelatedArtistsSuccess(response));
    } catch {
        yield put(fetchArtistRelatedArtistsError());
    }
}

export function* artistRelatedArtistsSaga() {
    yield takeLatest(fetchArtistRelatedArtists.type, fetchArtistRelatedArtistsHandler);
}