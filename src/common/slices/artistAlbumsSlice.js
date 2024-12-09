import { createDataSlice } from "../functions/createDataSlice";

export const artistAlbumsSlice = createDataSlice({ name: "artistAlbums" });

export const artistAlbumsReducer = artistAlbumsSlice.reducer;
export const { actions: artistAlbumsActions, selectors: artistAlbumsSelectors } = artistAlbumsSlice;