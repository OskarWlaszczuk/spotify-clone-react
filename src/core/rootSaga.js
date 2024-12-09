import { all } from "redux-saga/effects";
import { watchFetchArtistsSaga } from "../common/sagas/artistsSaga";
import { watchFetchAlbumsSaga } from "../common/sagas/albumsSaga";
import { watchFetchArtistDetails } from "../common/sagas/artistDetailsSaga";
import { watchFetchArtistTopTracks } from "../common/sagas/artistTopTracksSaga";
import { watchFetchArtistAlbums } from "../common/sagas/artistAlbumsSaga";
import { watchFetchRelatedArtists } from "../common/sagas/relatedArtistsSaga";
import { watchFetchAlbumDetailsSaga } from "../common/sagas/albumDetailsSaga";
import { authSaga } from "../common/sagas/authSaga";
import { watchFetchUserPlaylistsSaga } from "../common/sagas/userPlaylistSaga";
import { watchFetchTrackDetails } from "../common/sagas/trackDetailsSaga";
import { watchFetchTrackRecommendation } from "../common/sagas/trackRecommendationsSaga";

export function* rootSaga() {
    yield all([
        watchFetchArtistsSaga(),
        watchFetchAlbumsSaga(),
        watchFetchArtistDetails(),
        watchFetchArtistTopTracks(),
        watchFetchArtistAlbums(),
        watchFetchRelatedArtists(),
        watchFetchAlbumDetailsSaga(),
        authSaga(),
        watchFetchUserPlaylistsSaga(),
        watchFetchTrackDetails(),
        watchFetchTrackRecommendation(),
    ]);
};