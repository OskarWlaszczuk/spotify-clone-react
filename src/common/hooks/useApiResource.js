import { useSelector } from "react-redux";

export const useApiResource = ({ actions, selectors, endpoint }) => {
    const { fetch, clear } = actions;
    const { selectStatus, selectData } = selectors;

    const apiStatus = useSelector(selectStatus);
    const apiData = useSelector(selectData)?.data;

    const configs = { fetchAction: fetch, clearAction: clear, endpoint };
    
    return { configs, apiStatus, apiData };
};