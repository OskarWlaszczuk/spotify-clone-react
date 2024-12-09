import { createDataSlice } from "../functions/createDataSlice";

export const artistDetailsSlice = createDataSlice({ name: "artistDetails" });

export const artistDetailsReducer = artistDetailsSlice.reducer;
export const {
    actions: artistDetailsActions,
    selectors: artistDetailsSelectors
} = artistDetailsSlice;