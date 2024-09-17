import axios from "axios"
import { fetchAccessToken } from "./fetchAccessToken";
import { BASE_URL } from "./config";

export const fetchFromAPI = async ({ params }) => {

    const accessToken = await fetchAccessToken();
    try {
        const response = await axios
            .get(
                `${BASE_URL}${params}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            );
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
};