import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { artistsReducer } from '../features/homePage/artists/artistsSlice';
import { albumsReducer } from '../features/homePage/albums/albumsSlice';
import { artistDetailsReducer } from '../features/artistDetailsPage/artistDetails/artistDetailsSlice';
import { artistTopTracksReducer } from '../features/artistDetailsPage/topTracks/artistTopTracksSlice';
import { artistAlbumsReducer } from '../features/artistDetailsPage/albums/artistAlbumsSlice';
import { artistRelatedArtistsReducer } from '../features/artistDetailsPage/relatedArtists/relatedArtistsSlice';
import { artistSinglesReducer } from '../features/artistDetailsPage/artistSingles/artistSinglesSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        artists: artistsReducer,
        albums: albumsReducer,
        artistDetails: artistDetailsReducer,
        artistTopTracks: artistTopTracksReducer,
        artistAlbums: artistAlbumsReducer,
        artistRelatedArtists: artistRelatedArtistsReducer,
        artistSingles: artistSinglesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);