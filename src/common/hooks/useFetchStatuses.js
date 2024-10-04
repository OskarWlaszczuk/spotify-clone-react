import { useEffect } from "react";
import { initial, loading, success, error } from "../constants/fetchStatuses";
import { checkFetchStatuses } from "../functions/checkFetchStatuses";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const useFetchStatuses = (fetchStatuses = [], actions) => {
    const param = useParams();
    const id = param?.id;
    
    const dispatch = useDispatch();

    const isInitial = checkFetchStatuses(fetchStatuses, initial);
    const isLoading = checkFetchStatuses(fetchStatuses, loading);
    const isError = checkFetchStatuses(fetchStatuses, error);
    const isSucces = (checkFetchStatuses(fetchStatuses, success, true));

    useEffect(() => {
        const fetchDelayId = setTimeout(() => {
            actions.map(({ fetchAction }) => dispatch(fetchAction({ id } || '')));
        }, 500);

        return () => {
            actions.map(({ clearAction }) => dispatch(clearAction()));
            clearTimeout(fetchDelayId);
        };
    }, [
        dispatch,
        id,
    ]);

    return { isInitial, isLoading, isError, isSucces };
};