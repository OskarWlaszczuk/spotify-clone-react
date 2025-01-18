import { call, put, takeLatest } from "redux-saga/effects";
import { throwError } from "./throwError";

interface Params<ApiDataType> {
    getData:() => Promise<ApiDataType>
    actions: {
        fetchSuccess: () => void;
        fetchError: () => void;
    }
};

export function* createSaga<ApiDataType>({ getData, actions }) {

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