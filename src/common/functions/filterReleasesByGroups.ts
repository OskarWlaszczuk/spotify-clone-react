import { AlbumGroupName } from "../Types/AlbumGroupName";
import { isMatch } from "./isMatch"

export const filterReleasesByGroups = <ReleasedItem extends { album_group: AlbumGroupName }>(
    releasesList:ReleasedItem[],
    targetAlbumGroupsToFilterList:AlbumGroupName[],
) => {
    return targetAlbumGroupsToFilterList.map((targetAlbumGroup) => {
        return releasesList?.filter(
            ({ album_group }) => isMatch(album_group, targetAlbumGroup)
        )
    });
};