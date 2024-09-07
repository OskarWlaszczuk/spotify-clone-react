import { configureStore } from '@reduxjs/toolkit';
import { popularListReducer } from './slices/popularListSlice';

export const store = configureStore({
    reducer: {
        popularList: popularListReducer,
    },
});