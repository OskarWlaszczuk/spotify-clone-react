import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getAlbums = async ({id: ids}) => await fetchFromAPI({
    params: `albums?ids=${ids}`
});