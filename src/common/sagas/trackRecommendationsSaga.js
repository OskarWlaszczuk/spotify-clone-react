import { trackRecommendationsActions } from "../slices/trackRecommendationsSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchTrackRecommendation() {
    yield createSaga({
        getData: getApiResponse,
        actions: trackRecommendationsActions,
    });
};