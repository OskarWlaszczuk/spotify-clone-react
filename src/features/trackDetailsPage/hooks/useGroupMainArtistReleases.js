import { albumsParamDiscography, allReleaseParamDiscography, singleParamDiscography } from "../../../common/constants/artistDiscographyParams";
import { filterReleasesByGroups } from "../../../common/functions/filterReleasesByGroups";
import { removeDuplicatesByName } from "../../../common/functions/removeDuplicatesByName";

export const useGroupMainArtistReleases = ({ mainArtistAllReleasesData, topTracksAsAlbumsList }) => {
    const mainArtistAllReleasesList = mainArtistAllReleasesData?.items;

    const popularReleases = [...topTracksAsAlbumsList || [], ...mainArtistAllReleasesList || []];
    const uniquePopularRelease = removeDuplicatesByName(popularReleases);

    const [mainArtistAlbums, mainArtistSingles] = filterReleasesByGroups(mainArtistAllReleasesList, ["album", "single"]);

    const mainArtistGroupedReleasesList = [
        { type: "Releases", list: uniquePopularRelease, additionalPath: allReleaseParamDiscography, listId: 0 },
        { type: "Albums", list: mainArtistAlbums, additionalPath: albumsParamDiscography, listId: 1 },
        { type: "Singles and EP's", list: mainArtistSingles, additionalPath: singleParamDiscography, listId: 2 },
    ];

    return mainArtistGroupedReleasesList
};