import { ApiRequestParams } from "../Interfaces/ApiRequestParams";
import { fetchFromAPI } from "./fetchFromAPI";

export const getApiResponse = async <ApiDataType>({ endpoint, accessToken }: ApiRequestParams): Promise<ApiDataType> => (
    await fetchFromAPI<ApiDataType>({ endpoint, accessToken })
);