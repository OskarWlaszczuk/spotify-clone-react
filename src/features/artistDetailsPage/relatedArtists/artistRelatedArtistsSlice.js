import { createSlice } from "@reduxjs/toolkit";
import { error, loading, success } from "../../../common/constants/fetchStatuses";

export const artistRelatedArtistsSlice = createSlice({
    name: "artistRelatedArtists",
    initialState: {
        artistRelatedArtists: null,
        artistRelatedArtistsFetchStatus: loading,
    },
    reducers: {
        fetchArtistRelatedArtists: () => { },
        fetchArtistRelatedArtistsSuccess: (state, { payload: artistRelatedArtists }) => {
            state.artistRelatedArtists = artistRelatedArtists;
            state.artistRelatedArtistsFetchStatus = success;
        },
        fetchArtistRelatedArtistsError: (state) => {
            state.artistRelatedArtistsFetchStatus = error;
        },
    },
});

export const { fetchArtistRelatedArtists, fetchArtistRelatedArtistsSuccess, fetchArtistRelatedArtistsError } = artistRelatedArtistsSlice.actions;

export const selectArtistRelatedArtistsState = state => state.artistRelatedArtists;

export const selectArtistRelatedArtists = state => selectArtistRelatedArtistsState(state).artistRelatedArtists;
export const selectArtistRelatedArtistsFetchStatus = state => selectArtistRelatedArtistsState(state).artistRelatedArtistsFetchStatus;

export const artistRelatedArtistsReducer = artistRelatedArtistsSlice.reducer;