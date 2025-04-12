import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../slices/authSlice";
import { useApiResource } from "./useApiResource";

export const useFetchAPI = ({ actions, selectors, endpoint, fetchCondition = true }) => {
    const { resourceConfig, APIFetchStatus, APIData } = useApiResource({ actions, selectors, endpoint });
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);
console.
    useEffect(() => {
        const { fetchAction, clearAction, endpoint } = resourceConfig;

        if (fetchCondition && !!accessToken) {
            dispatch(fetchAction({ endpoint, accessToken }));
        }

        // return () => dispatch(clearAction());

    }, [dispatch, accessToken, resourceConfig, fetchCondition]);

    return { APIFetchStatus, APIData };
};