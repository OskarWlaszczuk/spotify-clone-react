import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { artistsReducer } from './components/features/homePage/artists/artistsSlice';
import { albumsReducer } from './components/features/homePage/albums/albumsSlice';
import { artistReducer } from './slices/artistSlice';
import { artistTopTracksReducer } from './slices/artistTopTracksSlice';
import { artistAlbumsReducer } from './slices/artistAlbumsSlice';
import { artistRelatedArtistsReducer } from './slices/artistRelatedArtistsSlice';

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