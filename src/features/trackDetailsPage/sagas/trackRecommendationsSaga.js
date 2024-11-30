import { trackRecommendationsActions } from "../slices/trackRecommendationsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchTrackRecommendation() {
    yield createSaga({
        getData: getAPI,
        actions: trackRecommendationsActions,
    });
};