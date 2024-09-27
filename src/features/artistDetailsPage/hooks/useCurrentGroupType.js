import { useState } from "react";
import { popularReleasesGroup, albumsGroup, singlesGroup, compilationsGroup } from "../constants/groups";
import { findMatchingItemValue } from "../../../common/functions/findMatchingGroup";

export const useCurrentGroupType = (newAlbumTypeGroup, param, groups = {}) => {
    const [currentGroupType, setCurrentGroupType] = useState(newAlbumTypeGroup);
    const { albums, singles, compilations, mergedArray, mergedArrayWithNewestFirst } = groups;

    const matchedGroup = findMatchingItemValue([
        { key: albumsGroup, value: albums },
        { key: singlesGroup, value: singles },
        { key: compilationsGroup, value: compilations },
        { key: popularReleasesGroup, value: param ? mergedArrayWithNewestFirst : mergedArray },
    ], currentGroupType);

    return { matchedGroup, currentGroupType, setCurrentGroupType };
};