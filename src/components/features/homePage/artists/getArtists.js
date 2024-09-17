import { fetchFromAPI } from "../../../../fetchFromAPI";

export const getArtists = () => fetchFromAPI({
    params: `artists?ids=6EB8VE9f7Ut6NOgviN6gDW%2C6QfFTZJHFSe9Xyes6DkAli%2C2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6%2C4Z8W4fKeB5YxbusRsdQVPb%2C7CJgLPEqiIRuneZSolpawQ`
});