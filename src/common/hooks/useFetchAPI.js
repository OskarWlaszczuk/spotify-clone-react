import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAccessToken} from "../slices/authSlice";

export const useFetchAPI = ({fetchConfigs, pageId, dependencies=[], fetchCondition = true}) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedFetchConfigs = useMemo(() => fetchConfigs, [pageId]);

    useEffect(() => {
        if (!!accessToken && fetchCondition) {
            memoizedFetchConfigs?.forEach(({fetchAction, endpoint}) => {
                try {
                    dispatch(fetchAction({endpoint, accessToken}));
                } catch (error) {
                    console.error(`Failed to fetch data from endpoint: ${endpoint}`, error);
                }
            });
        }

        return () => {
            memoizedFetchConfigs?.forEach(({clearAction}) => dispatch(clearAction()));
        };

    }, [dispatch, accessToken, ...dependencies, fetchCondition, memoizedFetchConfigs, pageId]);
};
