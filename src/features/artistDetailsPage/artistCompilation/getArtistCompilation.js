import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtistCompilation = async ({ id: artistID }) => await fetchFromAPI({
    params: `artists/${artistID}/albums?include_groups=compilation&limit=50`
});