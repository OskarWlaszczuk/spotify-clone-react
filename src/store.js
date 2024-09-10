import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { artistsReducer } from './slices/artistsSlice';
import { popularListReducer } from './slices/popularListSlice';
import { albumsReducer } from './slices/albumsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        artists: artistsReducer,
        albums: albumsReducer,
        popularList: popularListReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);