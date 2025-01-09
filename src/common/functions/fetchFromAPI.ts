import axios from "axios";
import { throwError } from "./throwError";
import { ApiResponse } from "../Interfaces/ApiResponse";
import { ApiDataToFetch } from "../Interfaces/ApiDataToFetch";

export const fetchFromAPI = async <ApiDataType>({ endpoint, accessToken }: ApiDataToFetch) => {
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
    } catch (error: any) {
        throwError("Problem with API fetching", error)
    }
};
