import { createSlice } from "@reduxjs/toolkit";

export const popularListSlice = createSlice({
    name: "popularList",
    initialState: {
        title: "lolo",
        listContent: [],
        artistsList: false,
    },
    reducers: {
        setPopularListTitle: (state, { payload: newTitle }) => {
            state.title = newTitle;
        }
    }
});

export const { setPopularListTitle } = popularListSlice.actions;

export const selectPopularListState = state => state.popularList;
export const selectPopularListTitle = state => selectPopularListState(state).title;


export const popularListReducer = popularListSlice.reducer;