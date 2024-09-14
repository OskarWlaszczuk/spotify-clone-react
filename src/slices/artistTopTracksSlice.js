import { createSlice } from "@reduxjs/toolkit";
import { error, loading, success } from "../fetchStatuses";

export const artistTopTracksSlice = createSlice({
    name: "artistTopTracks",
    initialState: {
        artistTopTracks: null,
        artistTopTracksFetchStatus: loading,
    },
    reducers: {
        fetchArtistTopTracks: () => { },
        fetchArtistTopTracksSuccess: (state, { payload: artistTopTracks }) => {
            state.artistTopTracks = artistTopTracks;
            state.artistTopTracksFetchStatus = success;
        },
        fetchArtistTopTracksError: (state) => {
            state.artistTopTracksFetchStatus = error;
        },
    },
});

export const { fetchArtistTopTracks, fetchArtistTopTracksSuccess, fetchArtistTopTracksError } = artistTopTracksSlice.actions;

export const selectArtistTopTracksState = state => state.artistTopTracks;

export const selectArtistTopTracks = state => selectArtistTopTracksState(state).artistTopTracks;
export const selectArtistTopTracksFetchStatus = state => selectArtistTopTracksState(state).artistTopTracksFetchStatus;

export const artistTopTracksReducer = artistTopTracksSlice.reducer;