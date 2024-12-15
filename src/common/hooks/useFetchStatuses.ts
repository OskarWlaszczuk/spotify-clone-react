import { useEffect, useState } from "react";
import { initial, loading, success, error } from "../constants/fetchStatuses";
import { FetchStatus } from "../Types/FetchStatus";

type isStatusMatched = boolean;

const checkFetchStatuses = (
    fetchStatuses: FetchStatus[],
    targetStatus: FetchStatus,
    matchingAll: boolean = false
): isStatusMatched => (
    matchingAll ?
        fetchStatuses.every(fetchState => fetchState === targetStatus)
        : fetchStatuses.some(fetchState => fetchState === targetStatus)
);

export const useFetchStatus = (fetchStatuses: FetchStatus[]): FetchStatus => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(initial);

    useEffect(() => {
        const isInitial = checkFetchStatuses(fetchStatuses, initial);
        const isLoading = checkFetchStatuses(fetchStatuses, loading);
        const isError = checkFetchStatuses(fetchStatuses, error);
        const isSuccess = checkFetchStatuses(fetchStatuses, success, true);

        if (isInitial) setFetchStatus(initial);
        if (isLoading) setFetchStatus(loading);
        if (isError) setFetchStatus(error);
        if (isSuccess) setFetchStatus(success);

    }, [fetchStatuses]);

    return fetchStatus;
};