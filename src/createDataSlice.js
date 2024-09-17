import { createSlice } from "@reduxjs/toolkit";
import { error, initial, loading, success } from "./fetchStatuses";

const initialState = {
    status: initial,
    datas: null,
};

export const createDataSlice = ({ name }) => {
    const slice = createSlice({
        name,
        initialState,
        reducers: {
            fetch: () => ({
                status: loading,
            }),
            fetchSuccess: (state, { payload: datas }) => ({
                ...state,
                status: success,
                datas: datas,
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
            selectDatas: state => state[name].datas,
            selectStatus: state => state[name].status,
        }
    };
};