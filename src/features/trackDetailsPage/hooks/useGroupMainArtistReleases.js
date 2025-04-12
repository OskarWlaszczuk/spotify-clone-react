import { albumsParamDiscography, popularReleasesParamDiscography, singleParamDiscography } from "../../../common/constants/artistDiscographyParams";
import { groupReleases } from "../../../common/functions/groupReleases";
import { removeDuplicatesByName } from "../../../common/functions/removeDuplicatesByName";

export const useGroupMainArtistReleases = ({ mainArtistAllReleasesData, topTracksAsAlbumsList }) => {

    const popularReleases = [...topTracksAsAlbumsList || [], ...mainArtistAllReleasesData || []];
    const uniquePopularRelease = removeDuplicatesByName(popularReleases);

    const [albums, singles] = groupReleases(mainArtistAllReleasesData, ["album", "single"]);

    const mainArtistGroupedReleasesList = [
        { type: "Releases", list: uniquePopularRelease, fullListType: popularReleasesParamDiscography, listId: 0 },
        { type: "Albums", list: albums, fullListType: albumsParamDiscography, listId: 1 },
        { type: "Singles and EP's", list: singles, fullListType: singleParamDiscography, listId: 2 },
    ];

    return mainArtistGroupedReleasesList;
};