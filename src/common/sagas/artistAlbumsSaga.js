import { artistAlbumsActions } from "../slices/artistAlbumsSlice";
import { createSaga } from "../functions/createSaga";
import { getApiResponse } from "../functions/getApiResponse";

export function* watchFetchArtistAlbums() {
    yield createSaga({
        getData: getApiResponse,
        actions: artistAlbumsActions,
    });
};