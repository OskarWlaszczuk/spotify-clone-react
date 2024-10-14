import { useEffect } from "react";
import { initial, loading, success, error } from "../constants/fetchStatuses";
import { checkFetchStatuses } from "../functions/checkFetchStatuses";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAccessToken } from "../functions/fetchAccessToken";
import { getAPI } from "../functions/getAPI";

// interface FetchActionParams {
//     id: string;
//     accessToken: string;
// }

// interface Action {
//     fetchAction: (params:FetchActionParams) => object;
//     clearAction: () => void;
// }

export const useFetchStatuses = (fetchStatuses = [], actions) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const isInitial = checkFetchStatuses(fetchStatuses, initial);
    const isLoading = checkFetchStatuses(fetchStatuses, loading);
    const isError = checkFetchStatuses(fetchStatuses, error);
    const isSucces = (checkFetchStatuses(fetchStatuses, success, true));

    useEffect(() => {
        const fetchAccessTokenAndData = async () => {
            const accessToken = await fetchAccessToken();

            actions.forEach(({ fetchAction, endpoint }) => {
                dispatch(fetchAction({ endpoint, accessToken }));
            });
        };

        fetchAccessTokenAndData();

        return () => {
            actions.forEach(({ clearAction }) => dispatch(clearAction()));
        };
    }, [dispatch, id]);


    return { isInitial, isLoading, isError, isSucces };
};