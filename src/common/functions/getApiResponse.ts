import { ApiRequestParams } from "../Interfaces/ApiRequestParams";
import { fetchFromAPI } from "./fetchFromAPI";

export const getApiResponse = async ({ endpoint, accessToken }: ApiRequestParams) => await fetchFromAPI(
    {
        endpoint,
        accessToken,
    }
);
