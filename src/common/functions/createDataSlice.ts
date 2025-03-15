import { createSlice, Draft, PayloadAction, Slice } from "@reduxjs/toolkit";
import { error, initial, loading, success } from "../constants/fetchStatuses";
import { FetchStatus } from "../Types/FetchStatus";
import { RootState } from "../../core/store";

interface InitialState<APIData> {
    status: FetchStatus;
    data: APIData | null
}

export const createDataSlice = <APIData>({ name }: { name: string }) => {

    const initialState: InitialState<APIData> = {
        status: initial,
        data: null,
    };

    const slice = createSlice({
        name,
        initialState,
        reducers: {
            fetch: (state) => {
                state.status = loading;
            },
            fetchSuccess: (state, { payload }: PayloadAction<APIData>) => {
                state.status = success;
                state.data = payload as Draft<APIData>;
            },
            fetchError: (state) => {
                state.status = error;
            },
            clear: () => initialState,
        },
    });

    return {
        reducer: slice.reducer,
        actions: slice.actions,
        selectors: {
            selectData: (state: RootState) => state[name].data,
            selectStatus: (state: RootState) => state[name].status,
        }
    };
};