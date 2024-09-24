import { all } from "redux-saga/effects";
import { watchFetchArtistsSaga } from "../features/homePage/artists/artistsSaga";
import { watchFetchAlbumsSaga } from "../features/homePage/albums/albumsSaga";
import { watchFetchArtistDetails } from "../features/artistDetailsPage/sagas/artistDetailsSaga";
import { watchFetchArtistTopTracks } from "../features/artistDetailsPage/sagas/artistTopTracksSaga";
import { watchFetchArtistAlbums } from "../features/artistDetailsPage/sagas/artistAlbumsSaga";
import { watchFetchRelatedArtists } from "../features/artistDetailsPage/sagas/relatedArtistsSaga";
import { watchFetchArtistSinglesSaga } from "../features/artistDetailsPage/sagas/artistSinglesSaga";
import { watchFetchArtistCompilationSaga } from "../features/artistDetailsPage/sagas/artistCompilationSaga";
import { watchFetchArtistAppearsOnSaga } from "../features/artistDetailsPage/sagas/artistAppearsOnSaga";

export function* rootSaga() {
    yield all([
        watchFetchArtistsSaga(),
        watchFetchAlbumsSaga(),
        watchFetchArtistDetails(),
        watchFetchArtistTopTracks(),
        watchFetchArtistAlbums(),
        watchFetchRelatedArtists(),
        watchFetchArtistSinglesSaga(),
        watchFetchArtistCompilationSaga(),
        watchFetchArtistAppearsOnSaga(),
    ]);
};