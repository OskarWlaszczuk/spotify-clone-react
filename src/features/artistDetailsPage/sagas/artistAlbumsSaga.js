import { artistAlbumsActions } from "../slices/artistAlbumsSlice";
import { createSaga } from "../../../common/functions/createSaga";
import { getAPI } from "../../../common/functions/getAPI";

export function* watchFetchArtistAlbums() {
    yield createSaga({
        getDatas: getAPI,
        actions: artistAlbumsActions,
    });
};