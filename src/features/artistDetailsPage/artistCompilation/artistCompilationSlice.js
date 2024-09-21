import { createDataSlice } from "../../../common/functions/createDataSlice";

export const artistCompilationSlice = createDataSlice(
    { name: "artistCompilation" }
);

export const artistCompilationReducer = artistCompilationSlice.reducer;

export const {
    actions: artistCompilationActions,
    selectors: artistCompilationSelectors
} = artistCompilationSlice;