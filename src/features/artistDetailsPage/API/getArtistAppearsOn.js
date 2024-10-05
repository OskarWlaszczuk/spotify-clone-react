import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtistAppearsOn = async ({ id: artistID, accessToken }) => await fetchFromAPI({
    params: `artists/${artistID}/albums?include_groups=appears_on&limit=50`,
    accessToken,
});