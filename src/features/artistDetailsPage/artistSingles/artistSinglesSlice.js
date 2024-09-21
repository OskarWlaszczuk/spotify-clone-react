import { createDataSlice } from "../../../common/functions/createDataSlice";

export const artistSinglesSlice = createDataSlice({ name: "artistSingles" });

export const artistSinglesReducer = artistSinglesSlice.reducer;
export const {
    actions: artistSinglesActions,
    selectors: artistSinglesSelectors
} = artistSinglesSlice;