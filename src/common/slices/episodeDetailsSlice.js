import { createDataSlice } from "../functions/createDataSlice";

export const episodeDetailsSlice = createDataSlice({ name: "episodeDetails" });

export const episodeDetailsReducer = episodeDetailsSlice.reducer;
export const { actions: episodeDetailsActions, selectors: episodeDetailsSelectors } = episodeDetailsSlice;