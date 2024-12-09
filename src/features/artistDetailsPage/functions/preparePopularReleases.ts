import { isLatestReleased } from "../../../common/functions/isLatestReleased";
import { removeDuplicates } from "../../../common/functions/removeDuplicates";
import { sortFromOldestToNewest } from "../../../common/functions/sortFromOldestToNewest";
import { WithReleaseDate } from "../../../common/interfaces/WithReleaseDate";

const setNewestPopularReleaseItemFirstIfIsLatestRelease = <T extends WithReleaseDate>(
    newestPopularReleaseItem: T | undefined,
    popularReleases: any
) => (
    newestPopularReleaseItem && isLatestReleased(newestPopularReleaseItem)
        ? [{ ...newestPopularReleaseItem }, ...(popularReleases?.slice() ?? [])]
        : popularReleases || []
);

export const preparePopularReleases = (topTracksAlbumsList: any, allReleasesWithoutAppearsOn: any) => {
    const newestTopTrackAlbumItem = sortFromOldestToNewest(topTracksAlbumsList)[0];
    const updatedTopTracksAlbumsList = setNewestPopularReleaseItemFirstIfIsLatestRelease(
        newestTopTrackAlbumItem,
        topTracksAlbumsList
    );

    const popularReleases: any = [
        ...(updatedTopTracksAlbumsList || []),
        ...(allReleasesWithoutAppearsOn || []),
    ];

    const uniquePopularReleases = removeDuplicates({ list: popularReleases, key: "name" });
    return uniquePopularReleases;
};