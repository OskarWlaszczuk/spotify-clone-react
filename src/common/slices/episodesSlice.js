import { createDataSlice } from "../functions/createDataSlice";

export const episodesSlice = createDataSlice({ name: "episodes" });

export const episodesReducer = episodesSlice.reducer;
export const { actions: episodesActions, selectors: episodesSelectors } = episodesSlice;