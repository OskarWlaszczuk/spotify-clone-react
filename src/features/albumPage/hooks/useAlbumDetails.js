import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { albumDetailsActions, albumDetailsSelectors } from "../../../common/slices/albumDetailsSlice";
import { getAlbumDetailsEndpoint } from "../../../common/functions/endpoints";

export const useAlbumDetails = (albumID) => {

    const { APIFetchStatus, APIData } = useFetchAPI({
        actions: albumDetailsActions,
        selectors: albumDetailsSelectors,
        endpoint: getAlbumDetailsEndpoint({ id: albumID }),
    });

    const album = {
        details: APIData,
        status: APIFetchStatus,
    };

    return album;
};