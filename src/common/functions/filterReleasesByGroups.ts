// import {AlbumGroupName} from "../Types/AlbumGroupName";
import {isMatch} from "./isMatch"

export type AlbumGroupName = "album" | "compilation" | "single" | "appears_on";
interface WithAlbumGroup {
    album_group: AlbumGroupName;
}

type FilterReleasesByGroupsFunction = (
    releasesList: WithAlbumGroup[],
    targetAlbumGroupsToFilterList: AlbumGroupName[]
) => WithAlbumGroup[][];

export const filterReleasesByGroups:FilterReleasesByGroupsFunction = (
    releasesList,
    targetAlbumGroupsToFilterList,
) => {
    return targetAlbumGroupsToFilterList.map((targetAlbumGroup) => {
        return releasesList?.filter(
            ({album_group}) => isMatch(album_group, targetAlbumGroup)
        )
    });
};