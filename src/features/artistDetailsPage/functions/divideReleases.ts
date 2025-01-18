import { filterReleasesByGroups } from "../../../common/functions/filterReleasesByGroups";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";

export const divideReleases = (artistAllReleas: AlbumItem[]) => {
    const [albumsList, compilationsList, singlesList, appearsOnList] = filterReleasesByGroups(
        artistAllReleas,
        ["album", "compilation", "single", "appears_on"]
    );
   
    const allReleasesWithoutAppearsOn = artistAllReleas?.filter(
        ({ album_group }: any) => album_group !== "appears_on"
    );

    return { albumsList, compilationsList, singlesList, appearsOnList, allReleasesWithoutAppearsOn };
};