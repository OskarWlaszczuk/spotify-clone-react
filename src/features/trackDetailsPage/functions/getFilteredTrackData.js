import { getSpecificKeys } from "../../../common/functions/getSpecificKeys";

export const getFilteredTrackData = (trackData) => {
    const filteredTrackData = getSpecificKeys(trackData, ["name", "type", "duration_ms", "popularity", "artists"]);
    const filteredAlbumData = getSpecificKeys(trackData?.album, ["name", "release_date", "id", "images"]);
    const filteredMainArtistData = getSpecificKeys(trackData?.artists[0], ["name", "id", "images"]);

    return [...filteredTrackData, ...filteredAlbumData, ...filteredMainArtistData];
};
