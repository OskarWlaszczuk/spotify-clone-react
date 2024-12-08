import axios from "axios";
interface APIFetchParams {
    endpoint: string;
    accessToken: string;
};

export const fetchFromAPI = async ({ endpoint, accessToken }: APIFetchParams) => {
    const BASE_URL: string = "https://api.spotify.com/v1/";
    
    try {
        const response = await axios.get(
            `${BASE_URL}${endpoint}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            }
        );

        return response.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};
