import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { error, initial, loading, success } from "../constants/fetchStatuses";
import { FetchStatus } from "../Types/FetchStatus";

interface InitialState<DataType> {
    status: FetchStatus;
    data: DataType | null;
}

interface CreateDataSliceParams {
    name: string;
}

export const createDataSlice = <DataType>({ name }: CreateDataSliceParams) => {

    const initialState: InitialState<DataType> = {
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
            fetchSuccess: (state, action: PayloadAction<DataType>) => {
                state.status = success;
                state.data = action.payload as Draft<DataType>;
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
            selectData: (state) => state[name].data,
            selectStatus: (state) => state[name].status,
        }
    };
};