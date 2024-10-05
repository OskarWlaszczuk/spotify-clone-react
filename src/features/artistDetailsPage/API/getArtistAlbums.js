import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtistAlbums = async ({ id: artistID, accessToken }) => await fetchFromAPI({
    params: `artists/${artistID}/albums?include_groups=album&limit=20`,
    accessToken
});