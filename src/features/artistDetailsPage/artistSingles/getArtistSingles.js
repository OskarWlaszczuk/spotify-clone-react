import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtistSingles = async ({ id: artistID }) => await fetchFromAPI({
    params: `artists/${artistID}/albums?include_groups=single&limit=50`
});