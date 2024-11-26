import { useSelector } from "react-redux";
import { formatApiResources } from "../functions/formatApiResources";

export const useApiResources = (configsList) => {
    const select = useSelector;
    
    const apiResources = configsList.map(({ action, selectors, endpoint }) => {
        const { fetch, clear } = action;

        const status = select(selectors.selectStatus);
        const datas = select(selectors.selectDatas)?.datas;

        const configs = { fetchAction: fetch, clearAction: clear, endpoint };

        return { configs, status, datas };
    });

    return formatApiResources(apiResources)
};