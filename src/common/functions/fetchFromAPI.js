import axios from "axios"
import { BASE_URL } from "../constants/config";

export const fetchFromAPI = async ({ params, accessToken }) => {
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