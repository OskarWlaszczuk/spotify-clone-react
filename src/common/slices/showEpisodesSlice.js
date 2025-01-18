import { createDataSlice } from "../functions/createDataSlice";

export const showEpisodesSlice = createDataSlice({ name: "showEpisodes" });

export const showEpisodesReducer = showEpisodesSlice.reducer;
export const { actions: showEpisodesActions, selectors: showEpisodesSelectors } = showEpisodesSlice;