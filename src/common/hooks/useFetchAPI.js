import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessToken, selectAccessToken } from "../slices/authSlice";

export const useFetchAPI = (fetchConfigs, dependencies = []) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

    useEffect(() => {
        if (!accessToken) {
            dispatch(fetchAccessToken());
        }
    }, [dispatch, accessToken]);

    useEffect(() => {
        if (accessToken) {
            fetchConfigs.forEach(({ fetchAction, endpoint }) => {
                dispatch(fetchAction({ endpoint, accessToken }));
            });
        }

        return () => {
            fetchConfigs.forEach(({ clearAction }) => dispatch(clearAction()));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, accessToken, ...dependencies]);
};
