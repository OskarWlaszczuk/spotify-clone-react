import { getAlbums } from "./getAlbums";
import { albumsActions } from "../../homePage/albums/albumsSlice";
import { createSaga } from  "../../../common/functions/createSaga";

export function* watchFetchAlbumsSaga() {
    yield createSaga({
        getDatas: getAlbums,
        actions: albumsActions,
    });
};