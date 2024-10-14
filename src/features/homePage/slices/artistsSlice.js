import { createDataSlice } from "../../../common/functions/createDataSlice";

export const artistsSlice = createDataSlice({ name: "artists" });

export const artistsReducer = artistsSlice.reducer;
export const { actions: artistsActions, selectors: artistsSelectors } = artistsSlice;