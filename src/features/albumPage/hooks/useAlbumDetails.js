import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { albumDetailsActions, albumDetailsSelectors } from "../slices/albumDetailsSlice";
import { getSpecificKeys } from "../../../common/functions/getSpecificKeys";
import { useApiResource } from "../../../common/hooks/useApiResource";

export const useAlbumDetails = (albumId) => {
    const { configs, rawApiData: albumDetails, apiStatus: albumDetailsStatus } = useApiResource({
        actions: albumDetailsActions,
        selectors: albumDetailsSelectors,
        endpoint: `albums/${albumId}`
    });

    const filteredAlbumDetails = getSpecificKeys(
        albumDetails,
        ["name", "images", "type", "release_date", "copyrights", "total_tracks", "tracks", "artists"]
    );

    useFetchAPI({ fetchConfigs: [configs], dependencies: [albumId] });

    return { filteredAlbumDetails, albumDetailsStatus };
};