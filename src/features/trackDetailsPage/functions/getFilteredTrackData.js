import { getSpecificKeys } from "../../../common/functions/getSpecificKeys";

export const getFilteredTrackData = (rawTrackDetails) => {
    const trackDetails = getSpecificKeys([rawTrackDetails], ["name", "type", "duration_ms", "popularity", "artists"])[0];
    const albumDetails = getSpecificKeys([trackDetails?.album], ["name", "release_date", "id", "images"])[0];

    return { trackDetails, albumDetails };
};
