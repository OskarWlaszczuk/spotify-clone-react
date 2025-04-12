import { createSlice } from "@reduxjs/toolkit";
import { error, initial, loading, success } from "../constants/fetchStatuses";

export const mediaSortedByCreatorState = {
    status: initial,
    data: {},
};

export const mediaSortedByCreatorSlice = createSlice({
    name: "mediaSortedByCreator",
    initialState: mediaSortedByCreatorState,
    reducers: {
        fetchMediaSortedByCreator: (state, { payload }) => {
            const { dataName } = payload;
            state.data[dataName] = state.data[dataName] || {};
            state.data[dataName].status = loading;
        },
        setMediaSortedByCreator: (state, { payload }) => {

            const { data, dataName } = payload;
            state.data[dataName] = { data: data?.map(({ items }) => items), status: success }
        },
        fetchMediaSortedByCreatorError: (state, { payload }) => {
            const { dataName } = payload;
            state.data[dataName] = state.data[dataName] || {};
            state.data[dataName].status = error;
        },
        clearMediaSortedByCreator: (state, { payload }) => {
            const { dataName } = payload;
            delete state.data[dataName];
        }
    }
});

export const {
    fetchMediaSortedByCreator,
    setMediaSortedByCreator,
    fetchMediaSortedByCreatorError,
    clearMediaSortedByCreator
} = mediaSortedByCreatorSlice.actions;
export const mediaSortedByCreatorReducer = mediaSortedByCreatorSlice.reducer;

export const selectMediaSortedByCreator = (state) => state.mediaSortedByCreator;

export const selectMediaSortedByCreatorData = (state, dataName) => state.mediaSortedByCreator.data[dataName]?.data || null;
export const selectMediaSortedByCreatorStatus = (state, dataName) => state.mediaSortedByCreator.data[dataName]?.status || initial;