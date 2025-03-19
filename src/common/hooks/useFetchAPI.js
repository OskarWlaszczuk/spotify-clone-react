import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../slices/authSlice";
import { useApiResource } from "./useApiResource";

export const useFetch = ({ actions, selectors, endpoint, fetchCondition = true }) => {
    const { resourceConfig, APIFetchStatus, APIData } = useApiResource({ actions, selectors, endpoint });

    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

    useEffect(() => {
        const { fetchAction, clearAction, endpoint } = resourceConfig;

        if (fetchCondition && !!accessToken && !APIData) {
            dispatch(fetchAction({ endpoint, accessToken }));
        }

        // return () => dispatch(clearAction());

    }, [dispatch, accessToken, resourceConfig, fetchCondition, APIData]);

    return { APIFetchStatus, APIData };
};









export const useFetchAPI = ({
    fetchConfigs,
    pageId,
    dependencies = [],
    fetchCondition = true
}) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const memoizedFetchConfigs = useMemo(() => fetchConfigs, [pageId]);
    // const combinedDependencies = [dispatch, accessToken, ...dependencies, fetchCondition];

    useEffect(() => {
        if (!!accessToken && fetchCondition) {
            fetchConfigs?.forEach(({ fetchAction, endpoint }) => {
                try {
                    dispatch(fetchAction({ endpoint, accessToken }));
                } catch (error) {
                    console.error(`Failed to fetch data from endpoint: ${endpoint}`, error);
                }
            });
        }

        return () => {
            fetchConfigs?.forEach(({ clearAction }) => dispatch(clearAction()));
        };

    }, []);
};


export const useFetchAPI2 = ({ fetchConfigs, fetchCondition = true, pageID, dependencies = [] }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

    const memoizedFetchConfigs = useMemo(() => fetchConfigs, [pageID]);

    useEffect(() => {
        if (!!accessToken && fetchCondition) {
            memoizedFetchConfigs?.forEach(({ fetchAction, endpoint }) => {
                dispatch(fetchAction({ endpoint, accessToken }));
            });
        }

        return () => {
            memoizedFetchConfigs?.forEach(({ clearAction }) => dispatch(clearAction()));
        };
    }, [accessToken, fetchCondition, memoizedFetchConfigs, dispatch, ...dependencies]);
};


// export const useFetchAPI3 = ({ fetchConfigs }) => {
//     const dispatch = useDispatch();
//     const accessToken = useSelector(selectAccessToken);

//     if (!!accessToken && !!fetchConfigs) {
//         fetchConfigs.forEach(({ fetchAction, endpoint }) => {
//             dispatch(fetchAction({ endpoint, accessToken }))
//         });
//     }
// }

// export const useFetchAPI2 = () => {
//     const dispatch = useDispatch();
//     const accessToken = useSelector(selectAccessToken);

//     const fetchAPI = async ({ fetchAction, clearAction, endpoint }) => {
//         const response = await dispatch(fetchAction({ endpoint, accessToken }));

//         return response.data;
//     };

//     return fetchAPI;
// };
