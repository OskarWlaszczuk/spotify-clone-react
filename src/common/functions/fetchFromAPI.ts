import axios from "axios";
import { ApiResponse } from "../Interfaces/ApiResponse";
import { ApiRequestParams } from "../Interfaces/ApiRequestParams";

export const fetchFromAPI = async <ApiDataType>({ endpoint, accessToken }: ApiRequestParams) => {
    const BASE_URL: string = "https://api.spotify.com/v1/";
    const url = `${BASE_URL}${endpoint}`

    const authHeaders = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    };

    try {
        const response = await axios.get(url, authHeaders) as ApiResponse<ApiDataType>;

        return response.data;
    } catch (error) {
        throw error
    }
};
