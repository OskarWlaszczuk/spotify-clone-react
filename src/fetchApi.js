import axios from "axios"
import { fetchAccessToken } from "./fetchAccessToken";

export const fetchApi = async url => {
    const accessToken = await fetchAccessToken();
    try {
        const response = await axios
            .get(
                url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            );
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}