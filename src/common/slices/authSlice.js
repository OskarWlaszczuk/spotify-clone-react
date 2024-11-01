import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        tokenExpirationTime: 0,
    },
    reducers: {
        fetchAccessToken: () => { },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.token;
            state.tokenExpirationTime = action.payload.expirationTime;
        },
        clearAccessToken: (state) => {
            state.accessToken = null;
            state.tokenExpirationTime = 0;
        },
    },
});

export const { setAccessToken, clearAccessToken,fetchAccessToken } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectTokenExpirationTime = (state) => state.auth.tokenExpirationTime;

export const authSliceReducer = authSlice.reducer;