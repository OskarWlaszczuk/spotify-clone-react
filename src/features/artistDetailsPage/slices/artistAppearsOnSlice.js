import { createDataSlice } from  "../../../common/functions/createDataSlice";

export const artistAppearsOnSlice = createDataSlice({ name: "artistAppearsOn" });

export const artistAppearsOnReducer = artistAppearsOnSlice.reducer;
export const { actions: artistAppearsOnActions, selectors: artistAppearsOnSelectors } = artistAppearsOnSlice;