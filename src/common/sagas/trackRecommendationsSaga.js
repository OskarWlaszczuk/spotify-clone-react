import { trackRecommendationsActions } from "../slices/trackRecommendationsSlice";
import { createSaga } from "../functions/createSaga";
import { getAPI } from "../functions/getAPI";

export function* watchFetchTrackRecommendation() {
    yield createSaga({
        getData: getAPI,
        actions: trackRecommendationsActions,
    });
};