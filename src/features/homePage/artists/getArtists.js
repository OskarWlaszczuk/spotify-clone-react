import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getArtists = async ({ accessToken }) => await fetchFromAPI({
    params: `artists?ids=4tZwfgrHOc3mvqYlEYSvVi,3hteYQFiMFbJY7wS0xDymP,7CJgLPEqiIRuneZSolpawQ,0tdKRrbItnLj40yUFi23jx,1fxbULcd6ryMNc1usHoP0R,0MIG6gMcQTSvFbKvUwK0id,1Xyo4u8uXC1ZmMpatF05PJ`,
    accessToken,
});
