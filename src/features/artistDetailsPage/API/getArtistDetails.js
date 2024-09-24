import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtistDetails = async ({ id: artistID }) => await fetchFromAPI(
    {
        params: `artists/${artistID}`
    }
);