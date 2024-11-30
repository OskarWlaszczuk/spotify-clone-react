import { isMatch } from "./isMatch"

export const filterReleasesByGroups = (releasesList , targetAlbumGroupsToFilterList) => {
    return targetAlbumGroupsToFilterList.map((targetAlbumGroup) => {
        return releasesList?.filter(({ album_group }) => isMatch(album_group, targetAlbumGroup))
    });
};