import { isLatestReleased } from "../../../common/functions/isLatestReleased";
import { removeDuplicates } from "../../../common/functions/removeDuplicates";
import { sortFromOldestToNewest } from "../../../common/functions/sortFromOldestToNewest";
import { WithReleaseDate } from "../../../common/interfaces/WithReleaseDate";
import { newestItemReleaseDate } from "../constants/newestItemReleaseDate";

 const replaceReleaseDateIfCurrentYear = <T extends WithReleaseDate>(listItem: T): T => {
    return isLatestReleased(listItem) ?
        { ...listItem, release_date: newestItemReleaseDate } :
        listItem;
};

const setNewestPopularReleaseItemFirstIfIsLatestRelease = <T extends WithReleaseDate>(
    newestPopularReleaseItem: T | undefined,
    popularReleases: any
) => (
    !!newestPopularReleaseItem && isLatestReleased(newestPopularReleaseItem) ?
        [replaceReleaseDateIfCurrentYear({ ...newestPopularReleaseItem }), ...(popularReleases?.slice() ?? [])]
        : popularReleases || []
);

export const preparePopularReleases = (topTracksAlbumsList: any, allReleasesWithoutAppearsOn: any) => {
    const newestTopTrackAlbumItem = sortFromOldestToNewest(topTracksAlbumsList)[0];
    console.log(replaceReleaseDateIfCurrentYear(newestTopTrackAlbumItem))

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