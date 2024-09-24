import { getArtistAlbums } from "../API/getArtistAlbums"
import { artistAlbumsActions } from "../slices/artistAlbumsSlice";
import { createSaga } from "../../../common/functions/createSaga";

export function* watchFetchArtistAlbums() {
    yield createSaga({
        getDatas: getArtistAlbums,
        actions: artistAlbumsActions,
    });
};