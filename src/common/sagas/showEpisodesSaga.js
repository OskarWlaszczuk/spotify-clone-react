import { showEpisodesActions } from "../slices/showEpisodesSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchShowEpisodesSaga() {
    yield createSaga({
        getData: getApiResponse,
        actions: showEpisodesActions,
    });
};