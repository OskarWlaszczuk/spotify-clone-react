import { getSeveralArtistsListEndpoint } from "../functions/endpoints";
import { formatIdsForFetch } from "../functions/formatIdsForFetch";
import { artistsActions, artistsSelectors } from "../slices/artistsSlice";
import { useFetchAPI } from "./useFetchAPI";

export const useFetchSeveralArtists = ({ IDs }) => {
    const formattedIDs = formatIdsForFetch(IDs);
    const fetchCondition = !!IDs;

    const { APIFetchStatus, APIData } = useFetchAPI({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: getSeveralArtistsListEndpoint({ id: formattedIDs }),
        fetchCondition,
        ID: IDs
    });

    const artists = {
        list: APIData?.artists,
        status: APIFetchStatus,
    };

    return artists;
};