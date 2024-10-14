import axios from "axios"
import { BASE_URL } from "../constants/config";

interface APIFetchParams {
    endpoint: string;
    accessToken: string;
};

export const fetchFromAPI = async ({ endpoint, accessToken }: APIFetchParams) => {
    try {
        const response = await axios
            .get(
                `${BASE_URL}${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            );
        return response.data;
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
};