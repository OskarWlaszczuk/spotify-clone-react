import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtistAlbums = async ({ id: artistID }) => await fetchFromAPI({
    params: `artists/${artistID}/albums?include_groups=album&limit=20`
});