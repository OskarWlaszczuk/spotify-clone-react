import { isLatestReleased } from "./isLatestReleased";

export const replaceReleaseDateIfCurrentYear = album => {
    return isLatestReleased(album) ?
        { ...album, release_date: "Latest Release" } :
        album;
};