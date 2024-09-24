import { createDataSlice } from "../../../common/functions/createDataSlice";

export const artistDetailsSlice = createDataSlice({ name: "artistDetails" });

export const artistDetailsReducer = artistDetailsSlice.reducer;
export const {
    actions: artistDetailsActions,
    selectors: artistDetailsSelectors
} = artistDetailsSlice;