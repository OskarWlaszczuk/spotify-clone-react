import { createDataSlice } from "../functions/createDataSlice";

export const showDetailsSlice = createDataSlice({ name: "showDetails" });

export const showDetailsReducer = showDetailsSlice.reducer;
export const {
    actions: showDetailsActions,
    selectors: showDetailsSelectors
} = showDetailsSlice;