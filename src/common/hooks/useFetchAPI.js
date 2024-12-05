import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessToken, selectAccessToken } from "../slices/authSlice";

export const useFetchAPI = ({ fetchConfigs, dependencies = [], fetchCondition = true }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

    useEffect(() => {
        if (!accessToken) {
            dispatch(fetchAccessToken());
        }
    }, [dispatch, accessToken]);

    useEffect(() => {
        if (!!accessToken && fetchCondition) {
            fetchConfigs?.forEach(({ fetchAction, endpoint }) => {
                dispatch(fetchAction({ endpoint, accessToken }));
            });
        }

        return () => {
            fetchConfigs?.forEach(({ clearAction }) => dispatch(clearAction()));
        };

    }, [dispatch, accessToken, ...dependencies, fetchCondition]);
};
