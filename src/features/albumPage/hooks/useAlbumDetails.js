import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { albumDetailsActions, albumDetailsSelectors } from "../../../common/slices/albumDetailsSlice";
import { getSpecificKeys } from "../../../common/functions/getSpecificKeys";
import { useApiResource } from "../../../common/hooks/useApiResource";
import { getAlbumDetailsEndpoint } from "../../../common/functions/endpoints";

export const useAlbumDetails = (albumId) => {
    const { configs, rawApiData: albumDetails, apiStatus: albumDetailsStatus } = useApiResource({
        actions: albumDetailsActions,
        selectors: albumDetailsSelectors,
        endpoint: getAlbumDetailsEndpoint({ id: albumId }),
    });

    const filteredAlbumDetails = getSpecificKeys(
        albumDetails,
        ["name", "images", "type", "release_date", "copyrights", "total_tracks", "tracks", "artists"]
    );

    useFetchAPI({ fetchConfigs: [configs], pageId: albumId, dependencies: [albumId] });

    return { filteredAlbumDetails, albumDetailsStatus };
};