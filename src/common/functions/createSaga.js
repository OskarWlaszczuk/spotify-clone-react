import { call, put, takeLatest } from "redux-saga/effects";

export function* createSaga({ getDatas, actions }) {

    function* fetchDatasHandler({ payload } = {}) {
        const { id, accessToken } = payload;
       
        try {
            const response = yield call(getDatas, { id: id || "", accessToken });
            yield put(actions.fetchSuccess({
                datas: response
            }));
        } catch {
            yield put(actions.fetchError());
        }
    };

    yield takeLatest(actions.fetch.type, fetchDatasHandler);
};