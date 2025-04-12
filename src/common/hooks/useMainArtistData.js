import { artistDetailsActions, artistDetailsSelectors } from "../slices/artistDetailsSlice";
import { useFetchAPI } from "./useFetchAPI";
import { artistAlbumsActions, artistAlbumsSelectors } from "../slices/artistAlbumsSlice";
import { getArtistDetailsEndpoint, getArtistReleasesEndpoint } from "../functions/endpoints";

export const useMainArtistData = ({ artistID }) => {

    const fetchCondition = !!artistID;

    const { APIFetchStatus: dataStatus, APIData: details } = useFetchAPI({
        actions: artistDetailsActions,
        selectors: artistDetailsSelectors,
        endpoint: getArtistDetailsEndpoint({ id: artistID }),
        fetchCondition,
    });

    const { APIFetchStatus: releasesStatus, APIData: releases } = useFetchAPI({
        actions: artistAlbumsActions,
        selectors: artistAlbumsSelectors,
        endpoint: getArtistReleasesEndpoint({ id: artistID }),
        fetchCondition,
    });

    const mainArtistData = {
        details,
        releases: releases?.items,
        statuses: [dataStatus, releasesStatus]
    };

    return mainArtistData;
};