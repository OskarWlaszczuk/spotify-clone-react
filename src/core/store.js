import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { artistsReducer } from '../features/homePage/artists/artistsSlice';
import { albumsReducer } from '../features/homePage/albums/albumsSlice';
import { artistReducer } from '../features/artistDetailsPage/artistDetails/artistSlice';
import { artistTopTracksReducer } from '../features/artistDetailsPage/topTracks/artistTopTracksSlice';
import { artistAlbumsReducer } from '../features/artistDetailsPage/albums/artistAlbumsSlice';
import { artistRelatedArtistsReducer } from '../features/artistDetailsPage/relatedArtists/artistRelatedArtistsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        artists: artistsReducer,
        albums: albumsReducer,
        artist: artistReducer,
        artistTopTracks: artistTopTracksReducer,
        artistAlbums: artistAlbumsReducer,
        artistRelatedArtists: artistRelatedArtistsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);