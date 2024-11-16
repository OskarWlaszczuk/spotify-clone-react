import { createDataSlice } from "../../../common/functions/createDataSlice";

export const trackRecommendationsSlice = createDataSlice({ name: "trackRecommendations" });

export const trackRecommendationsReducer = trackRecommendationsSlice.reducer;
export const { actions: trackRecommendationsActions, selectors: trackRecommendationsSelectors } = trackRecommendationsSlice;