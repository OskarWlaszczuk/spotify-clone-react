import { useState } from "react";
import { popularReleasesGroup, albumsGroup, singlesGroup, compilationsGroup } from "../constants/groups";
import { isAlbumGroupMatch } from "../functions/isAlbumGroupMatch";

export const useAlbumTypeGroup = (newAlbumTypeGroup, groups = {}) => {
    const [currentGroupType, setCurrentGroupType] = useState(newAlbumTypeGroup);
    const { albums, singles, compilations, sortedPopularReleasesWithNewestFirst } = groups;

    const findMatchingGroup = () => {
        if (isAlbumGroupMatch(albumsGroup, currentGroupType)) return { group: albums, title: "Albums" };
        if (isAlbumGroupMatch(singlesGroup, currentGroupType)) return { group: singles, title: "Singles" };
        if (isAlbumGroupMatch(compilationsGroup, currentGroupType)) return { group: compilations, title: "Compilations" };
        if (isAlbumGroupMatch(popularReleasesGroup, currentGroupType)) return { group: sortedPopularReleasesWithNewestFirst, title: "Popular releases" };
    };

    const matchedGroup = findMatchingGroup();

    return { matchedGroup, currentGroupType, setCurrentGroupType };
};