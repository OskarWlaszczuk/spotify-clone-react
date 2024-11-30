import { removeDuplicates } from "../../../common/functions/removeDuplicates";
import { setNewestPopularReleaseItemFirstIfIsLatestRelease } from "../../../common/functions/setNewestPopularReleaseItemFirstIfIsLatestRelease";
import { sortFromOldestToNewest } from "../../../common/functions/sortFromOldestToNewest";

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