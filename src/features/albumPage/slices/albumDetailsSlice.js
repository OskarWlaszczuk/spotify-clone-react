import { createDataSlice } from "../../../common/functions/createDataSlice";

export const albumDetailsSlice = createDataSlice({ name: "albumDetails" });

export const albumDetailsReducer = albumDetailsSlice.reducer;
export const { actions: albumDetailsActions, selectors: albumDetailsSelectors } = albumDetailsSlice;