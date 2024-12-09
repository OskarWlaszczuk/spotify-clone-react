import { createDataSlice } from "../functions/createDataSlice";

export const trackRecommendationsSlice = createDataSlice({ name: "trackRecommendations" });

export const trackRecommendationsReducer = trackRecommendationsSlice.reducer;
export const { actions: trackRecommendationsActions, selectors: trackRecommendationsSelectors } = trackRecommendationsSlice;