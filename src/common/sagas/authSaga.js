import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import qs from "qs";
import { setAccessToken, selectAccessToken, selectTokenExpirationTime } from "../slices/authSlice";
import { throwError } from "../functions/throwError";

const CLIENT_ID = "1c062a811f654b81932ae5e0a1c88ade";
const CLIENT_SECRET = "2bca0bbbed0448899810ba0f091334da";

function* fetchAccessTokenSaga() {
    const accessToken = yield select(selectAccessToken);
    const tokenExpirationTime = yield select(selectTokenExpirationTime);

    if (accessToken && tokenExpirationTime > Date.now()) return;

    const data = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    });

    try {
        const response = yield call(axios.post, 'https://accounts.spotify.com/api/token', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const newToken = response.data.access_token;
        const expirationTime = Date.now() + response.data.expires_in * 1000;

        yield put(setAccessToken({ token: newToken, expirationTime }));

    } catch (error) {
        throwError("Problem with fetching access token", error);
    }
};

export function* authSaga() {
    yield takeLatest("auth/fetchAccessToken", fetchAccessTokenSaga);
};