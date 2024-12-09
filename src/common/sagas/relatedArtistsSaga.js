import { relatedArtistsActions } from "../slices/relatedArtistsSlice";
import { createSaga } from "../functions/createSaga";
import { getAPI } from "../functions/getAPI";

export function* watchFetchRelatedArtists() {
    yield createSaga({
        getData: getAPI,
        actions: relatedArtistsActions,
    });
};