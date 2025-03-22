import { AlbumItem } from "../Interfaces/AlbumItem";
import { AlbumGroupName } from "../Types/AlbumGroupName";
import { isMatch } from "./isMatch"

export const filterReleasesByGroups = (releasesList: AlbumItem[], albumGroupNames: AlbumGroupName[]) => {
    const releasesGrouped = Object.fromEntries(albumGroupNames.map(groupName => [
        groupName,
        releasesList?.filter(({ album_group }) => isMatch(album_group, groupName))
    ]));

    return releasesGrouped;
};