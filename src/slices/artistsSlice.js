import { createSlice } from "@reduxjs/toolkit";
import { error, loading, success } from "../fetchStatuses";

export const artistsSlice = createSlice({
    name: "artists",
    initialState: {
        artists: null,
        artistsFetchStatus: loading,
    },
    reducers: {
        fetchArtists: () => { },
        fetchArtistsSuccess: (state, { payload: artists }) => {
            state.artists = artists;
            state.artistsFetchStatus = success;
        },
        fetchArtistsError: (state) => {
            state.artistsFetchStatus = error;
        },
    },
});

export const { fetchArtists, fetchArtistsSuccess, fetchArtistsError } = artistsSlice.actions;

export const selectArtistsState = state => state.artists;

export const selectArtists = state => selectArtistsState(state).artists;
export const selectArtistsFetchStatus = state => selectArtistsState(state).artistsFetchStatus;

export const artistsReducer = artistsSlice.reducer;