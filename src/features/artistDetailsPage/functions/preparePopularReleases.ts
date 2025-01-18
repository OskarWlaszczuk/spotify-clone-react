import { removeDuplicatesByName } from "../../../common/functions/removeDuplicatesByName";
import { sortFromOldestToNewest } from "../../../common/functions/sortFromOldestToNewest";
import { WithReleaseDate } from "../../../common/Interfaces/WithReleaseDate";
import { newestItemReleaseDate } from "../constants/newestItemReleaseDate";

 const isLatestReleased = <T extends WithReleaseDate>(album: T): boolean => (
    new Date(album?.release_date).getFullYear() === new Date().getFullYear()
);

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
    const updatedTopTracksAlbumsList = setNewestPopularReleaseItemFirstIfIsLatestRelease(
        newestTopTrackAlbumItem,
        topTracksAlbumsList
    );

    const popularReleases = [
        ...(updatedTopTracksAlbumsList || []),
        ...(allReleasesWithoutAppearsOn || []),
    ];

    const uniquePopularReleases = removeDuplicatesByName(popularReleases);
    return uniquePopularReleases;
};