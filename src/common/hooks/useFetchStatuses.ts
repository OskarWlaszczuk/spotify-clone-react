import { useEffect, useState } from "react";
import { initial, loading, success, error } from "../constants/fetchStatuses";
import { checkFetchStatuses } from "../functions/checkFetchStatuses";

type FetchStatus = 'initial' | 'loading' | 'success' | 'error';

export const useFetchStatus = (fetchStatuses: FetchStatus[] = []): string => {
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