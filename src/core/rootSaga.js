import { all } from "redux-saga/effects";
import { watchFetchArtistSaga } from "../features/homePage/artists/artistsSaga";
import { watchFetchAlbumsSaga } from "../features/homePage/albums/albumsSaga";
import { watchFetchArtistDetails } from "../features/artistDetailsPage/artistDetails/artistDetailsSaga";
import { artistTopTracksSaga } from "../features/artistDetailsPage/topTracks/artistTopTracksSaga";
import { watchFetchArtistAlbums } from "../features/artistDetailsPage/albums/artistAlbumsSaga";
import { artistRelatedArtistsSaga } from "../features/artistDetailsPage/relatedArtists/relatedArtistsSaga";

export function* rootSaga() {
    yield all([
        watchFetchArtistSaga(),
        watchFetchAlbumsSaga(),
        watchFetchArtistDetails(),
        artistTopTracksSaga(),
        watchFetchArtistAlbums(),
        artistRelatedArtistsSaga(),
    ]);
};