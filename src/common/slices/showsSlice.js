import { createDataSlice } from "../functions/createDataSlice";

export const showsSlice = createDataSlice({ name: "shows" });

export const showsReducer = showsSlice.reducer;
export const { actions: showsActions, selectors: showsSelectors } = showsSlice;