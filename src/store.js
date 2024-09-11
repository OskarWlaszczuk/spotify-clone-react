import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { artistsReducer } from './slices/artistsSlice';
import { albumsReducer } from './slices/albumsSlice';
import { artistReducer } from './slices/artistSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        artists: artistsReducer,
        albums: albumsReducer,
        artist: artistReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);