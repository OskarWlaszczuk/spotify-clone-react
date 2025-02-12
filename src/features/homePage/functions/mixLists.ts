import { MediaItem } from "../../../common/Interfaces/MediaItem";

export const mixLists = (count: number, ...arrays: MediaItem[][]): MediaItem[] => {
    const mixedList: MediaItem[] = [];

    const selectedArrays = arrays?.map(arr => arr?.slice(0, count));

    for (let i = 0; i < count; i++) {
        for (const arr of selectedArrays) {
            if (arr?.[i] !== undefined) {
                mixedList?.push(arr[i]);
            }
        }
    };

    return mixedList;
};