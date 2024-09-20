import { createSlice } from "@reduxjs/toolkit";
import { error, loading, success } from  "../../../common/constants/fetchStatuses";

export const artistSlice = createSlice({
    name: "artist",
    initialState: {
        artist: null,
        artistFetchStatus: loading,
    },
    reducers: {
        fetchArtist: () => { },
        fetchArtistSuccess: (state, { payload: artist }) => {
            state.artist = artist;
            state.artistFetchStatus = success;
        },
        fetchArtistError: (state) => {
            state.artistFetchStatus = error;
        },
    },
});

export const { fetchArtist, fetchArtistSuccess, fetchArtistError } = artistSlice.actions;

export const selectArtistState = state => state.artist;

export const selectArtist = state => selectArtistState(state).artist;
export const selectArtistFetchStatus = state => selectArtistState(state).artistFetchStatus;

export const artistReducer = artistSlice.reducer;