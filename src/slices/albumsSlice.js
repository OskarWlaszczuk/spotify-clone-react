import { createSlice } from "@reduxjs/toolkit";
import { error, loading, success } from "../fetchStatuses";

export const albumsSlice = createSlice({
    name: "albums",
    initialState: {
        albums: [],
        albumsFetchStatus: loading,
    },
    reducers: {
        fetchAlbums: () => { },
        fetchAlbumsSuccess: (state, { payload: albums }) => {
            state.albums = albums;
            state.albumsFetchStatus = success;
        },
        fetchAlbumsError: (state) => {
            state.albumsFetchStatus = error;
        },
    },
});

export const { fetchAlbums, fetchAlbumsSuccess, fetchAlbumsError } = albumsSlice.actions;

export const selectAlbumsState = state => state.albums;

export const selectAlbums = state => selectAlbumsState(state).albums;
export const selectAlbumsFetchStatus = state => selectAlbumsState(state).albumsFetchStatus;

export const albumsReducer = albumsSlice.reducer;