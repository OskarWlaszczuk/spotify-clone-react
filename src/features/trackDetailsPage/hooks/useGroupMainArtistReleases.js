import { albumsParamDiscography, allReleaseParamDiscography, singleParamDiscography } from "../../../common/constants/params";
import { filterReleasesByGroups } from "../../../common/functions/filterReleasesByGroups";
import { removeDuplicates } from "../../../common/functions/removeDuplicates";

export const useGroupMainArtistReleases = ({ mainArtistAllReleasesData, topTracksList, trackId }) => {
    const mainArtistAllReleasesList = mainArtistAllReleasesData?.items;

    const topTracksAsAlbumsList = topTracksList?.tracks.map(({ album }) => album);
    const popularReleases = [...topTracksAsAlbumsList || [], ...mainArtistAllReleasesList || []];
    const uniquePopularRelease = removeDuplicates({ list: popularReleases, key: "name" });

    const [mainArtistAlbums, mainArtistSingles] = filterReleasesByGroups(mainArtistAllReleasesList, ["album", "single"]);

    const mainArtistGroupedReleasesList = [
        { type: "Releases", list: uniquePopularRelease, additionalPath: allReleaseParamDiscography, listId: 0 },
        { type: "Albums", list: mainArtistAlbums, additionalPath: albumsParamDiscography, listId: 1 },
        { type: "Singles and EP's", list: mainArtistSingles, additionalPath: singleParamDiscography, listId: 2 },
    ];

    return mainArtistGroupedReleasesList
};