import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchFromAPI } from  "../../../common/functions/fetchFromAPI";
import { BASE_URL } from  "../../../common/constants/config";
import { actions } from './artistAlbumsSlice';

const { fetch, fetchSuccess, fetchError } = actions;

function* fetchArtistAlbumsHandler({ payload }) {

    try {
        const response = yield call(fetchFromAPI, `${BASE_URL}artists/${payload}/albums?include_groups=album&limit=20`);

        yield put(fetchSuccess(response));
    } catch {
        yield put(fetchError());
    }
};

export function* artistAlbumssSaga() {
    yield takeLatest(fetch.type, fetchArtistAlbumsHandler);
};