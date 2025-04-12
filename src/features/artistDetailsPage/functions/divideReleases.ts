import { groupReleases } from "../../../common/functions/groupReleases";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";

export const divideReleases = (artistAllReleas: AlbumItem[]) => {
    const releasesGrouped = groupReleases(
        artistAllReleas,
        ["album", "compilation", "single", "appears_on"]
    );

    const allReleasesWithoutAppearsOn = artistAllReleas?.filter(
        ({ album_group }: any) => album_group !== "appears_on"
    );

    return { releasesGrouped, allReleasesWithoutAppearsOn };
};