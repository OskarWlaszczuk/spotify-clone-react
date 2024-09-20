import { createDataSlice } from "../../../common/functions/createDataSlice";

export const artistTopTracksSlice = createDataSlice({ name: "artistTopTracks" });

export const artistTopTracksReducer = artistTopTracksSlice.reducer;
export const { actions: artistTopTracksActions, selectors: artistTopTracksSelectors } = artistTopTracksSlice;