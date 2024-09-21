import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const getAlbums = async () => await fetchFromAPI({
    params: `albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc`
});