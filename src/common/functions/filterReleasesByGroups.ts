import { AlbumItem } from "../Interfaces/AlbumItem";
import { AlbumGroupName } from "../Types/AlbumGroupName";
import { isMatch } from "./isMatch"

export const filterReleasesByGroups = (releasesList: AlbumItem[], targetAlbumGroupsToFilterList: AlbumGroupName[]) => {
    console.log(releasesList)
    const releasesGrouped = Object.fromEntries(targetAlbumGroupsToFilterList.map(groupName => [
        groupName,
        releasesList?.filter(({ album_group }) => isMatch(album_group, groupName))
    ]));

    return releasesGrouped;
};