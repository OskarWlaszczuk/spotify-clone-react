import { TrackItem } from "../../../common/Interfaces/TrackItem";

const removeDuplicateDiscs = (discsList: TrackItem["disc_number"][]) => {
    const uniqueDiscs = new Set(discsList);
    return Array.from(uniqueDiscs);
};

export const getUniqueDiscNumbers = (tracksList: TrackItem[]) => {
    const albumTracksDiscNumbersDuplicatesList = tracksList?.map(({ disc_number }) => disc_number);
    const uniqueAlbumTracksDiscNumbers = removeDuplicateDiscs(albumTracksDiscNumbersDuplicatesList);

    return uniqueAlbumTracksDiscNumbers;
};