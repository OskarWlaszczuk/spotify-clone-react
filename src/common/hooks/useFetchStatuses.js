import { useEffect, useState } from "react";
import { initial, loading, success, error } from "../constants/fetchStatuses";
import { checkFetchStatuses } from "../functions/checkFetchStatuses";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAccessToken } from "../functions/fetchAccessToken";

export const useFetchStatus = (fetchStatuses = [], fetchConfigs) => {
    const { id } = useParams();
    const dispatch = useDispatch();

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

    useEffect(() => {
        const fetchAccessTokenAndData = async () => {
            const accessToken = await fetchAccessToken();

            fetchConfigs.forEach(({ fetchAction, endpoint }) => {
                dispatch(fetchAction({ endpoint, accessToken }));
            });
        };

        fetchAccessTokenAndData();

        return () => {
            fetchConfigs.forEach(({ clearAction }) => dispatch(clearAction()));
        };
    }, [dispatch, id]);

    return fetchStatus;
};