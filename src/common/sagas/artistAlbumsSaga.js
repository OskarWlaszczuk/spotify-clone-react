import { artistAlbumsActions } from "../slices/artistAlbumsSlice";
import { createSaga } from "../functions/createSaga";
import { getAPI } from "../functions/getAPI";

export function* watchFetchArtistAlbums() {
    yield createSaga({
        getData: getAPI,
        actions: artistAlbumsActions,
    });
};