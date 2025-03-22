import { AlbumGroupName } from "../Types/AlbumGroupName";
import { isMatch } from "./isMatch"

export const filterReleasesByGroups = <ReleasedItem extends { album_group: AlbumGroupName }>(
    releasesList: ReleasedItem[],
    targetAlbumGroupsToFilterList: AlbumGroupName[],
) => {
    const releasesGrouped = Object.fromEntries(targetAlbumGroupsToFilterList.map(groupName => [
        groupName,
        releasesList?.filter(({ album_group }) => isMatch(album_group, groupName))
    ]));
    
    return releasesGrouped;
};