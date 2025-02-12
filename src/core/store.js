import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { artistsReducer } from '../common/slices/artistsSlice';
import { albumsReducer } from '../common/slices/albumsSlice';
import { artistDetailsReducer } from '../common/slices/artistDetailsSlice';
import { artistTopTracksReducer } from '../common/slices/artistTopTracksSlice';
import { artistAlbumsReducer } from '../common/slices/artistAlbumsSlice';
import { artistRelatedArtistsReducer } from '../common/slices/relatedArtistsSlice';
import { albumDetailsReducer } from '../common/slices/albumDetailsSlice';
import { authSliceReducer } from '../common/slices/authSlice';
import { userPlaylistsReducer } from '../common/slices/userPlaylistSlice';
import { trackDetailsReducer } from '../common/slices/trackDetailsSlice';
import { trackRecommendationsReducer } from '../common/slices/trackRecommendationsSlice';
import { episodesReducer } from '../common/slices/episodesSlice';
import { episodeDetailsReducer } from '../common/slices/episodeDetailsSlice';
import { showDetailsReducer } from '../common/slices/showDetailsSlice';
import { showsReducer } from '../common/slices/showsSlice';
import { showEpisodesReducer } from '../common/slices/showEpisodesSlice';
import { mediaSortedByCreatorReducer } from '../common/slices/mediaSortedByCreatorSlice';
import { newReleasesReducer } from '../common/slices/newReleasesSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        artists: artistsReducer,
        albums: albumsReducer,
        artistDetails: artistDetailsReducer,
        artistTopTracks: artistTopTracksReducer,
        artistAlbums: artistAlbumsReducer,
        artistRelatedArtists: artistRelatedArtistsReducer,
        albumDetails: albumDetailsReducer,
        auth: authSliceReducer,
        userPlaylists: userPlaylistsReducer,
        trackDetails: trackDetailsReducer,
        trackRecommendations: trackRecommendationsReducer,
        episodes: episodesReducer,
        episodeDetails: episodeDetailsReducer,
        showDetails: showDetailsReducer,
        shows: showsReducer,
        showEpisodes: showEpisodesReducer,
        mediaSortedByCreator: mediaSortedByCreatorReducer,
        newReleases: newReleasesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);