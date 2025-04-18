import { createDataSlice } from "../functions/createDataSlice";

export const albumsSlice = createDataSlice({ name: "albums" });

export const albumsReducer = albumsSlice.reducer;
export const { actions: albumsActions, selectors: albumsSelectors } = albumsSlice;