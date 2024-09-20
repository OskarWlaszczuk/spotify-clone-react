import { getArtistAlbums } from "./getArtistAlbums";
import { artistAlbumsActions } from "./artistAlbumsSlice";
import { createSaga } from "../../../common/functions/createSaga";

export function* watchFetchArtistAlbums() {
    yield createSaga({
        getDatas: getArtistAlbums,
        actions: artistAlbumsActions,
    });
};