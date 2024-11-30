import { relatedArtistsActions } from "../slices/relatedArtistsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchRelatedArtists() {
    yield createSaga({
        getData: getAPI,
        actions: relatedArtistsActions,
    });
};