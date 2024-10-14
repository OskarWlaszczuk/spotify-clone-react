import { relatedArtistsActions } from "../slices/relatedArtistsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchRelatedArtists() {
    yield createSaga({
        getDatas: getAPI,
        actions: relatedArtistsActions,
    });
};