import { removeDuplicates } from "../../../common/functions/removeDuplicates";

export const getUniqueDiscNumbers = (tracksList) => {
    const albumTracksDiscNumbersDuplicatesList = tracksList?.map(({ disc_number }) => disc_number);
    const uniqueAlbumTracksDiscNumbers = removeDuplicates({list:albumTracksDiscNumbersDuplicatesList});

    return uniqueAlbumTracksDiscNumbers;
};