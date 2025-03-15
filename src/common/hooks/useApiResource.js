import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useApiResource = ({ actions, selectors, endpoint }) => {
    const { selectStatus, selectData } = selectors;

    const APIFetchStatus = useSelector(selectStatus);
    const APIData = useSelector(selectData)?.data;

    const resourceConfig = useMemo(() => {
        const { fetch, clear } = actions;
        return { fetchAction: fetch, clearAction: clear, endpoint };
    }, [actions, endpoint]);

    return { resourceConfig, APIFetchStatus, APIData };
};