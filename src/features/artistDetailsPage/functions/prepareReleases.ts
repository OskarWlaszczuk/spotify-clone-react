import { filterReleasesByGroups } from "../../../common/functions/filterReleasesByGroups";

export const prepareReleases = (artistAllReleas: any) => {
    const [albumsList, compilationsList, singlesList, appearsOnList] = filterReleasesByGroups(
        artistAllReleas,
        ["album", "compilation", "single", "appears_on"]
    );

    const allReleasesWithoutAppearsOn = artistAllReleas?.filter(
        ({ album_group }: any) => album_group !== "appears_on"
    );

    return { albumsList, compilationsList, singlesList, appearsOnList, allReleasesWithoutAppearsOn };
};