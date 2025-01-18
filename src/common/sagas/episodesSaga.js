import { episodesActions } from "../slices/episodesSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchEpisodesSaga() {
    yield createSaga({
        getData: getApiResponse,
        actions: episodesActions,
    });
};