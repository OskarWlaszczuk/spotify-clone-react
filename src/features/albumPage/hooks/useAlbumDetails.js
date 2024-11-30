import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { albumDetailsActions, albumDetailsSelectors } from "../slices/albumDetailsSlice";
import { getSpecificKeys } from "../../../common/functions/getSpecificKeys";
import { useApiResources } from "../../../common/hooks/useApiResources";

export const useAlbumDetails = (albumId) => {
    const { configs, apiData: rawAlbumDetails, statuses } = useApiResources([{
        action: albumDetailsActions,
        selectors: albumDetailsSelectors,
        endpoint: `albums/${albumId}`
    }]);

    const filteredAlbumData = getSpecificKeys(
        rawAlbumDetails,
        ["name", "images", "type", "release_date", "copyrights", "total_tracks", "tracks", "artists"]
    );
    console.log(filteredAlbumData);
    const [albumDetailsStatus] = statuses;

    useFetchAPI([...configs], [albumId]);

    return { filteredAlbumData, albumDetailsStatus };
};