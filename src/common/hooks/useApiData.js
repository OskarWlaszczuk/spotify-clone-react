import { useSelector } from "react-redux";

export const useApiData = (artistActions, artistSelectors, endpoint) => {
    const { fetch, clear } = artistActions;

    const status = useSelector(artistSelectors.selectStatus);
    const datas = useSelector(artistSelectors.selectDatas)?.datas;

    const configs = { fetchAction: fetch, clearAction: clear, endpoint };

    return { configs, status, datas };
};