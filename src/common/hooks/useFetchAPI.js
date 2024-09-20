import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchAPI = (fetchDelay, fetchActions, clearActions, fetchedDatas) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDelayID = setTimeout(() => {
            fetchActions.forEach(fetchAction => {
                dispatch(fetchAction())
            });
        }, fetchDelay);

        return () => {
            clearTimeout(fetchDelayID);
            clearActions.forEach(clearAction => {
                dispatch(clearAction())
            });
        };

    }, [dispatch, fetchActions, clearActions, fetchDelay]);
};