import { relatedArtistsActions } from "./relatedArtistsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getRelatedArtists } from "./getRelatedArtists";

export function* watchFetchRelatedArtists() {
    yield createSaga({
        getDatas: getRelatedArtists,
        actions: relatedArtistsActions,
    });
};