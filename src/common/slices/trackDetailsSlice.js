import { createDataSlice } from "../functions/createDataSlice";

export const trackDetailsSlice = createDataSlice({ name: "trackDetails" });

export const trackDetailsReducer = trackDetailsSlice.reducer;
export const { actions: trackDetailsActions, selectors: trackDetailsSelectors } = trackDetailsSlice;