import { fetchFromAPI } from "./fetchFromAPI";

interface getAPIParameters {
    endpoint: string;
    accessToken: string;
};

export const getAPI = async ({ endpoint, accessToken }: getAPIParameters) => await fetchFromAPI(
    {
        endpoint,
        accessToken,
    }
);
