import { createDataSlice } from "../functions/createDataSlice";

export const newReleasesSlice = createDataSlice({ name: "newReleases" });

export const newReleasesReducer = newReleasesSlice.reducer;
export const { actions: newReleasesActions, selectors: newReleasesSelectors } = newReleasesSlice;