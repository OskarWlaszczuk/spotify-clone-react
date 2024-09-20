import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtistAlbums = ({ id }) => fetchFromAPI({
    params: `artists/${id}/albums?include_groups=album&limit=20`
});