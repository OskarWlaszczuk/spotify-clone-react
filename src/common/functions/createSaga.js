import { call, put, takeLatest } from "redux-saga/effects";



export function* createSaga({ getData, actions }) {

    function* fetchDataHandler({ payload } = {}) {
        const { endpoint, accessToken } = payload;

        try {
            const response = yield call(getData, { endpoint, accessToken });
            yield put(actions.fetchSuccess({
                data: response
            }));
        } catch {
            yield put(actions.fetchError());
        }
    };

    yield takeLatest(actions.fetch.type, fetchDataHandler);
};