import { useEffect, useState } from "react";
import { initial, loading, success, error } from "../constants/fetchStatuses";
import { FetchStatus } from "../types/FetchStatus";

const checkFetchStatuses = (
    fetchStatuses: string[],
    targetStatus: string,
    matchAll: boolean = false
): boolean => (
    matchAll ?
        fetchStatuses.every(fetchState => fetchState === targetStatus)
        : fetchStatuses.some(fetchState => fetchState === targetStatus)
);

export const useFetchStatus = (fetchStatuses: any[] = []): FetchStatus => {
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(initial);

    useEffect(() => {
        const isInitial: boolean = checkFetchStatuses(fetchStatuses, initial);
        const isLoading: boolean = checkFetchStatuses(fetchStatuses, loading);
        const isError: boolean = checkFetchStatuses(fetchStatuses, error);
        const isSucces: boolean = checkFetchStatuses(fetchStatuses, success, true);

        if (isInitial) setFetchStatus(initial);
        if (isLoading) setFetchStatus(loading);
        if (isError) setFetchStatus(error);
        if (isSucces) setFetchStatus(success);

    }, [fetchStatuses]);

    return fetchStatus;
};