import axios from "axios";
import qs from "qs";

const CLIENT_ID = "1c062a811f654b81932ae5e0a1c88ade";
const CLIENT_SECRET = "2bca0bbbed0448899810ba0f091334da";

let accessToken: null | string = null;
let tokenExpirationTime: number = 1;

export const fetchAccessToken = async () => {
    if (accessToken && tokenExpirationTime > Date.now()) {
        return accessToken;
    }

    const data = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': `${CLIENT_ID}`,
        'client_secret': `${CLIENT_SECRET}`,
    });

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        accessToken = response.data.access_token;
        tokenExpirationTime = Date.now() + (response.data.expires_in * 1000);

        return accessToken;
    } catch (error) {
        console.error("Błąd podczas pobierania tokena: ", error);
        return null;
    }
};
