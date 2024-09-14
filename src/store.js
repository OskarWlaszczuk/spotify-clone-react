import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { artistsReducer } from './slices/artistsSlice';
import { albumsReducer } from './slices/albumsSlice';
import { artistReducer } from './slices/artistSlice';
import { artistTopTracksReducer } from './slices/artistTopTracksSlice';
import { artistAlbumsReducer } from './slices/artistAlbumsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        artists: artistsReducer,
        albums: albumsReducer,
        artist: artistReducer,
        artistTopTracks: artistTopTracksReducer,
        artistAlbums: artistAlbumsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);