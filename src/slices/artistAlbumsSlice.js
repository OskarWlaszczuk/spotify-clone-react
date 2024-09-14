import { createSlice } from "@reduxjs/toolkit";
import { error, loading, success } from "../fetchStatuses";

export const artistAlbumsSlice = createSlice({
    name: "artistAlbums",
    initialState: {
        artistAlbums: null,
        artistAlbumsFetchStatus: loading,
    },
    reducers: {
        fetchArtistAlbums: () => { },
        fetchArtistAlbumsSuccess: (state, { payload: artistAlbums }) => {
            state.artistAlbums = artistAlbums;
            state.artistAlbumsFetchStatus = success;
        },
        fetchArtistAlbumsError: (state) => {
            state.artistAlbumsFetchStatus = error;
        },
    },
});

export const { fetchArtistAlbums, fetchArtistAlbumsSuccess, fetchArtistAlbumsError } = artistAlbumsSlice.actions;

export const selectArtistAlbumsState = state => state.artistAlbums;

export const selectArtistAlbums = state => selectArtistAlbumsState(state).artistAlbums;
export const selectArtistAlbumsFetchStatus = state => selectArtistAlbumsState(state).artistAlbumsFetchStatus;

export const artistAlbumsReducer = artistAlbumsSlice.reducer;