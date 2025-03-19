import { getSeveralAlbumsListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { albumsActions, albumsSelectors } from "../slices/albumsSlice";
import { useFetch } from "./useFetchAPI";

export const useFetchSeveralAlbums = ({ IDs, fetchCondition = true }) => {
    const formattedIDs = formatIdsForFetch(IDs);

    const { APIFetchStatus: albumsStatus, APIData } = useFetch({
        actions: albumsActions,
        selectors: albumsSelectors,
        endpoint: getSeveralAlbumsListEndpoint({ id: formattedIDs }),
        fetchCondition
    });

    const albums = APIData?.albums;

    return { albums, albumsStatus };
};