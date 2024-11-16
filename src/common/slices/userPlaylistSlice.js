import { createDataSlice } from "../functions/createDataSlice";

export const userPlaylistsSlice = createDataSlice({ name: "userPlaylists" });

export const userPlaylistsReducer = userPlaylistsSlice.reducer;
export const { actions: userPlaylistsActions, selectors: userPlaylistsSelectors } = userPlaylistsSlice;