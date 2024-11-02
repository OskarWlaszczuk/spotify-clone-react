import { useSelector } from "react-redux";

export const useArtistDatas = (artistID, artistActions, artistSelectors, resource = "") => {
    const { fetch, clear } = artistActions;

    const artistStatus = useSelector(artistSelectors.selectStatus);
    const artistDatas = useSelector(artistSelectors.selectDatas)?.datas;

    const configs = { fetchAction: fetch, clearAction: clear, endpoint: `artists/${artistID}/${resource}` };

    return { configs, artistStatus, artistDatas };
};