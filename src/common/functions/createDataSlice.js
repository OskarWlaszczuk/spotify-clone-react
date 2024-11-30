import { createSlice } from "@reduxjs/toolkit";
import { error, initial, loading, success } from "../constants/fetchStatuses";

const initialState = {
    status: initial,
    data: null,
};

export const createDataSlice = ({ name }) => {
    const slice = createSlice({
        name,
        initialState,
        reducers: {
            fetch: () => ({
                status: loading,
            }),
            fetchSuccess: (state, { payload: data }) => ({
                ...state,
                status: success,
                data: data,
            }),
            fetchError: () => ({
                status: error,
            }),
            clear: () => initialState,
        },
    });

    return {
        reducer: slice.reducer,
        actions: slice.actions,
        selectors: {
            selectData: state => state[name].data,
            selectStatus: state => state[name].status,
        }
    };
};