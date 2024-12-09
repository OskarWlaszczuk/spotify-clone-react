import { call, put, takeLatest } from "redux-saga/effects";
import { throwError } from "./throwError";

export function* createSaga({ getData, actions }) {

    function* fetchDataHandler({ payload } = {}) {
        const { endpoint, accessToken } = payload;

        try {
            const response = yield call(getData, { endpoint, accessToken });
            yield put(actions.fetchSuccess({
                data: response
            }));
        } catch (error) {
            yield put(actions.fetchError());
            throwError("Problem with fetching in createSaga", error);
        }
    };

    yield takeLatest(actions.fetch.type, fetchDataHandler);
};