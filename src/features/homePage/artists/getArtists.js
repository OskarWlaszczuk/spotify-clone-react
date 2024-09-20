import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtists = ({ id: ids }) => fetchFromAPI({
    params: `artists?ids=${ids}`
});