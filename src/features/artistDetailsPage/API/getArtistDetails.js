import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtistDetails = async ({ id: artistID, accessToken }) => await fetchFromAPI(
    {
        params: `artists/${artistID}`,
        accessToken,
    }
);