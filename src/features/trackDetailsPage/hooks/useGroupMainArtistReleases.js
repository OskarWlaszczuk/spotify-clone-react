import { albumsParamDiscography, allReleaseParamDiscography, singleParamDiscography } from "../../../common/constants/artistDiscographyParams";
import { filterReleasesByGroups } from "../../../common/functions/filterReleasesByGroups";
import { removeDuplicatesByName } from "../../../common/functions/removeDuplicatesByName";

export const useGroupMainArtistReleases = ({ mainArtistAllReleasesData, topTracksAsAlbumsList }) => {

    const popularReleases = [...topTracksAsAlbumsList || [], ...mainArtistAllReleasesData || []];
    const uniquePopularRelease = removeDuplicatesByName(popularReleases);

    const [mainArtistAlbums, mainArtistSingles] = filterReleasesByGroups(mainArtistAllReleasesData, ["album", "single"]);

    const mainArtistGroupedReleasesList = [
        { type: "Releases", list: uniquePopularRelease, fullListType: allReleaseParamDiscography, listId: 0 },
        { type: "Albums", list: mainArtistAlbums, fullListType: albumsParamDiscography, listId: 1 },
        { type: "Singles and EP's", list: mainArtistSingles, fullListType: singleParamDiscography, listId: 2 },
    ];

    return mainArtistGroupedReleasesList;
};