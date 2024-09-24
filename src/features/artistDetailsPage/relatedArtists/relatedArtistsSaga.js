import { relatedArtistsActions } from "../slices/relatedArtistsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getRelatedArtists } from "../API/getRelatedArtists"

export function* watchFetchRelatedArtists() {
    yield createSaga({
        getDatas: getRelatedArtists,
        actions: relatedArtistsActions,
    });
};