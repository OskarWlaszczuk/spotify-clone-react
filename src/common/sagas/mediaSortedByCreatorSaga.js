import { call, put, takeLatest } from "redux-saga/effects";
import { fetchMediaSortedByCreator, fetchMediaSortedByCreatorError, setMediaSortedByCreator } from "../slices/mediaSortedByCreatorSlice";
import { getArtistReleasesEndpoint, getShowEpisodes } from "../functions/endpoints";
import { fetchFromAPI } from "../functions/fetchFromAPI";

const selectEndpointBasedOnType = (dataName) => {

    switch (dataName) {
        case "album":
            return getArtistReleasesEndpoint;

        case "episode":
            return getShowEpisodes;

        default:
            return
    };
};

const fetchHandler = async (creatorsIDs, accessToken, dataName) => {
    const response = await Promise.all(creatorsIDs.map(id => {
        const selectedEndpointFunction = selectEndpointBasedOnType(dataName);

        return fetchFromAPI({
            endpoint: selectedEndpointFunction({ id }),
            accessToken
        })
    }));

    return response
};

function* fetchMediaSortedByCreatorHandler({ payload }) {
    const { creatorsIDs, accessToken, dataName } = payload;

    try {
        const mediaSortedByCreators = yield call(fetchHandler, creatorsIDs, accessToken, dataName);
        yield put(setMediaSortedByCreator({ data: mediaSortedByCreators, dataName }));
    } catch {
        yield put(fetchMediaSortedByCreatorError({ dataName }));
    }
};

export function* mediaSortedByCreatorSaga() {
    yield takeLatest(fetchMediaSortedByCreator.type, fetchMediaSortedByCreatorHandler)
};