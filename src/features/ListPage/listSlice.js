import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
    name: "list",
    initialState: {
        title: "",
        list: null,
        isArtistsList: true,
        navigationID: null,
    },
    reducers: {
        setList: (state, { payload }) => {
            const { title, list, isArtistsList, navigationID } = payload;

            state.title = title;
            state.list = list;
            state.isArtistsList = isArtistsList;
            state.navigationID = navigationID;
        },
        setNavigationID: (state, { payload }) => {
            const { navigationID } = payload;
            state.navigationID = navigationID
        },
    },
});

export const { setList, setNavigationID } = listSlice.actions;

export const selectListStates = state => state.list;

export const listReducer = listSlice.reducer;
