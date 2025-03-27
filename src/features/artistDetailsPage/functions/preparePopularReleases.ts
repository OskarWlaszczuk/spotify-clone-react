import { removeDuplicatesByName } from "../../../common/functions/removeDuplicatesByName";
import { orderByReleaseDateNewestFirst } from "../../../common/functions/orderByReleaseDateNewestFirst";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { newestItemReleaseDate } from "../constants/newestItemReleaseDate";


const setLatestReleaseFirst = (newestPopularReleaseItem: AlbumItem, popularReleases: AlbumItem[]) => {
    const isCurrentYearReleased = (album: AlbumItem): boolean => (
        new Date(album?.release_date).getFullYear() === new Date().getFullYear()
    );

    const replaceReleaseDateIfCurrentYear = (listItem: AlbumItem) => {
        return isCurrentYearReleased(listItem) ?
            { ...listItem, release_date: newestItemReleaseDate } :
            listItem;
    };

    return !!newestPopularReleaseItem && isCurrentYearReleased(newestPopularReleaseItem) ?
        [replaceReleaseDateIfCurrentYear({ ...newestPopularReleaseItem }), ...(popularReleases?.slice() ?? [])] :
        popularReleases || []
};

export const preparePopularReleases = (topTracksAlbums: AlbumItem[], allReleasesWithoutAppearsOn: any) => {
    const newestTopTrackAlbumItem = orderByReleaseDateNewestFirst(topTracksAlbums)[0];
    const updatedTopTracksAlbumsList = setLatestReleaseFirst(
        newestTopTrackAlbumItem,
        topTracksAlbums
    );

    const popularReleases = [
        ...(updatedTopTracksAlbumsList || []),
        ...(allReleasesWithoutAppearsOn || []),
    ];

    const uniquePopularReleases = removeDuplicatesByName(popularReleases);
    const sortedUniquePopularReleases = orderByReleaseDateNewestFirst(uniquePopularReleases);

    return sortedUniquePopularReleases;
};