import { all } from "redux-saga/effects";
import { watchFetchAsrtistsSaga } from "../features/homePage/artists/artistsSaga";
import { watchFetchAlbumsSaga } from "../features/homePage/albums/albumsSaga";
import { artistSaga } from "../features/artistDetailsPage/artistDetails/artistSaga";
import { artistTopTracksSaga } from "../features/artistDetailsPage/topTracks/artistTopTracksSaga";
import { watchFetchArtistAlbums } from "../features/artistDetailsPage/albums/artistAlbumsSaga";
import { artistRelatedArtistsSaga } from "../features/artistDetailsPage/relatedArtists/relatedArtistsSaga";

export function* rootSaga() {
    yield all([
        watchFetchAsrtistsSaga(),
        watchFetchAlbumsSaga(),
        artistSaga(),
        artistTopTracksSaga(),
        watchFetchArtistAlbums(),
        artistRelatedArtistsSaga(),
    ]);
};