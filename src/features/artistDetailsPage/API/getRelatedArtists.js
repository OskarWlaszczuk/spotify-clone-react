import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getRelatedArtists = async ({ id: artistID }) => await fetchFromAPI({
    params: `artists/${artistID}/related-artists`
});