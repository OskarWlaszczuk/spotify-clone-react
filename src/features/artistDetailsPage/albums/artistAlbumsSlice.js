import { createDataSlice } from  "../../../common/functions/createDataSlice";

export const artistAlbumsSlice = createDataSlice({ name: "artistAlbums" });

export const artistAlbumsReducer = artistAlbumsSlice.reducer;
export const { actions, selectors } = artistAlbumsSlice;