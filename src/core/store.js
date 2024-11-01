import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { artistsReducer } from '../features/homePage/slices/artistsSlice';
import { albumsReducer } from '../features/homePage/slices/albumsSlice';
import { artistDetailsReducer } from '../features/artistDetailsPage/slices/artistDetailsSlice';
import { artistTopTracksReducer } from '../features/artistDetailsPage/slices/artistTopTracksSlice';
import { artistAlbumsReducer } from '../features/artistDetailsPage/slices/artistAlbumsSlice';
import { artistRelatedArtistsReducer } from '../features/artistDetailsPage/slices/relatedArtistsSlice';
import { artistSinglesReducer } from '../features/artistDetailsPage/slices/artistSinglesSlice';
import { artistCompilationReducer } from '../features/artistDetailsPage/slices/artistCompilationSlice';
import { artistAppearsOnReducer } from '../features/artistDetailsPage/slices/artistAppearsOnSlice';
import { albumDetailsReducer } from '../features/albumPage/slices/albumDetailsSlice';
import { authSliceReducer } from '../common/slices/authSlice';

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
        artistCompilation: artistCompilationReducer,
        artistAppearsOn: artistAppearsOnReducer,

        albumDetails: albumDetailsReducer,

        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);