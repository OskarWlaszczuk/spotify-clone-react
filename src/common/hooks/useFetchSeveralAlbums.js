import { getSeveralAlbumsListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { albumsActions, albumsSelectors } from "../slices/albumsSlice";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchSeveralAlbums = ({ IDs, fetchCondition = true }) => {
    const formattedIDs = formatIdsForFetch(IDs);

    const { APIFetchStatus, APIData } = useFetchAPI({
        actions: albumsActions,
        selectors: albumsSelectors,
        endpoint: getSeveralAlbumsListEndpoint({ id: formattedIDs }),
        fetchCondition
    });

    const albums = {
        list: APIData?.albums,
        status: APIFetchStatus,
    };

    return albums;
};