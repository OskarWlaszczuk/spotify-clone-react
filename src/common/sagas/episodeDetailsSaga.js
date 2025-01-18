import { episodeDetailsActions } from "../slices/episodeDetailsSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchEpisodeDetailsSaga() {
    yield createSaga({
        getData: getApiResponse,
        actions: episodeDetailsActions,
    });
};