import { all } from "redux-saga/effects";
import { watchFetchArtistsSaga } from "../features/homePage/artists/artistsSaga";
import { watchFetchAlbumsSaga } from "../features/homePage/albums/albumsSaga";
import { watchFetchArtistDetails } from "../features/artistDetailsPage/artistDetails/artistDetailsSaga";
import { watchFetchArtistTopTracks } from "../features/artistDetailsPage/topTracks/artistTopTracksSaga";
import { watchFetchArtistAlbums } from "../features/artistDetailsPage/albums/artistAlbumsSaga";
import { watchFetchRelatedArtists } from "../features/artistDetailsPage/relatedArtists/relatedArtistsSaga";

export function* rootSaga() {
    yield all([
        watchFetchArtistsSaga(),
        watchFetchAlbumsSaga(),
        watchFetchArtistDetails(),
        watchFetchArtistTopTracks(),
        watchFetchArtistAlbums(),
        watchFetchRelatedArtists(),
    ]);
};