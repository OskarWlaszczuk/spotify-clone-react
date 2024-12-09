import { createDataSlice } from "../functions/createDataSlice";

export const relatedArtistsSlice = createDataSlice({ name: "artistRelatedArtists" });

export const artistRelatedArtistsReducer = relatedArtistsSlice.reducer;
export const {
    actions: relatedArtistsActions,
    selectors: relatedArtistsSelectors
} = relatedArtistsSlice;