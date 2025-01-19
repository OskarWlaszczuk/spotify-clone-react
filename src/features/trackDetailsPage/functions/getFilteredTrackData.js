import { getSpecificKeys } from "../../../common/functions/getSpecificKeys";

export const getFilteredTrackData = (trackDetails) => {
    const filteredTrackData = getSpecificKeys([trackDetails], ["name", "type", "duration_ms", "popularity", "artists"]);
    const filteredAlbumData = getSpecificKeys([trackDetails?.album], ["name", "release_date", "id", "images"]);
    const filteredMainArtistData = getSpecificKeys([trackDetails?.artists[0]], ["name", "id"]);

    return [...filteredTrackData, ...filteredAlbumData, ...filteredMainArtistData];
};
