import { useSelector } from "react-redux";

const formatApiResources = (apiResources) => {
    const configs = apiResources.map(({ configs }) => configs);
    const apiData = apiResources.map(({ apiData }) => apiData);
    const statuses = apiResources.map(({ status }) => status);

    return { configs, apiData, statuses };
};


export const useApiResources = (configsList) => {
    const select = useSelector;

    const apiResources = configsList.map(({ action, selectors, endpoint }) => {
        const { fetch, clear } = action;

        const status = select(selectors.selectStatus);
        const apiData = select(selectors.selectData)?.data;

        const configs = { fetchAction: fetch, clearAction: clear, endpoint };

        return { configs, status, apiData };
    });

    return formatApiResources(apiResources)
};