import { fetchFromAPI } from "./fetchFromAPI";


export const getAPI = async ({endpoint, accessToken}) => await fetchFromAPI(
    {
        endpoint,
        accessToken,
    }
);
