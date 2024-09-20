import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtistTopTracks = async ({ id: artistID }) => await fetchFromAPI({
    params: `artists/${artistID}/top-tracks`
});