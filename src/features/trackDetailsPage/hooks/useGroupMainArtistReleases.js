import { albumsParamDiscography, allReleaseParamDiscography, singleParamDiscography } from "../../../common/constants/params";
import { filterReleasesByGroups } from "../../../common/functions/filterReleasesByGroups";
import { removeDuplicates } from "../../../common/functions/removeDuplicates";
import { useGenerateUniqueListId } from "../../../common/hooks/useGenerateUniqueListId";

export const useGroupMainArtistReleases = ({ mainArtistAllReleasesData, topTracksList, trackId }) => {

    const mainArtistAllReleasesList = mainArtistAllReleasesData?.items;

    const topTracksAsAlbumsList = topTracksList?.tracks.map(({ album }) => album);
    const popularReleases = [...topTracksAsAlbumsList || [], ...mainArtistAllReleasesList || []];
    const uniquePopularRelease = removeDuplicates({ list: popularReleases, key: "name" });
    const [mainArtistAlbums, mainArtistSingles] = filterReleasesByGroups(mainArtistAllReleasesList, ["album", "single"]);

    const updatedUniquePopularRelease = useGenerateUniqueListId(uniquePopularRelease);
    const updatedMainArtistAlbums = useGenerateUniqueListId(mainArtistAlbums);
    const updatedMainArtistSingles = useGenerateUniqueListId(mainArtistSingles);

    const mainArtistGroupedReleasesList = [
        { type: "Releases", list: updatedUniquePopularRelease, additionalPath: allReleaseParamDiscography },
        { type: "Albums", list: updatedMainArtistAlbums, additionalPath: albumsParamDiscography },
        { type: "Singles and EP's", list: updatedMainArtistSingles, additionalPath: singleParamDiscography },
    ];

    return mainArtistGroupedReleasesList
};