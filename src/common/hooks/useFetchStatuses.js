import { useEffect, useState } from "react";
import { initial, loading, success, error } from "../constants/fetchStatuses";
import { checkFetchStatuses } from "../functions/checkFetchStatuses";

export const useFetchStatus = (fetchStatuses = []) => {
    const [fetchStatus, setFetchStatus] = useState(initial);

    useEffect(() => {
        const isInitial = checkFetchStatuses(fetchStatuses, initial);
        const isLoading = checkFetchStatuses(fetchStatuses, loading);
        const isError = checkFetchStatuses(fetchStatuses, error);
        const isSucces = checkFetchStatuses(fetchStatuses, success, true);

        if (isInitial) setFetchStatus(initial);
        if (isLoading) setFetchStatus(loading);
        if (isError) setFetchStatus(error);
        if (isSucces) setFetchStatus(success);
    }, [fetchStatuses]);

    return fetchStatus;
};