import { createDataSlice } from "../functions/createDataSlice";

export const albumDetailsSlice = createDataSlice({ name: "albumDetails" });

export const albumDetailsReducer = albumDetailsSlice.reducer;
export const { actions: albumDetailsActions, selectors: albumDetailsSelectors } = albumDetailsSlice;