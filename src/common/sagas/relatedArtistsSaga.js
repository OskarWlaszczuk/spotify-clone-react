import { relatedArtistsActions } from "../slices/relatedArtistsSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchRelatedArtists() {
    yield createSaga({
        getData: getApiResponse,
        actions: relatedArtistsActions,
    });
};