import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { albumDetailsActions, albumDetailsSelectors } from "../slices/albumDetailsSlice";
import { getSpecificKeys } from "../../../common/functions/getSpecificKeys";
import { useApiResources } from "../../../common/hooks/useApiResources";

export const useAlbumDetails = (id) => {
    const { configs, datas: rawAlbumDetails, statuses: albumDetailsStatus } = useApiResources([{
        action: albumDetailsActions,
        selectors: albumDetailsSelectors,
        endpoint: `albums/${id}`
    }]);

    const filteredAlbumData = getSpecificKeys(
        rawAlbumDetails,
        ["name", "images", "type", "release_date", "copyrights", "total_tracks", "tracks", "artists"]
    );

    useFetchAPI([...configs], [id]);

    return { filteredAlbumData, albumDetailsStatus };
};