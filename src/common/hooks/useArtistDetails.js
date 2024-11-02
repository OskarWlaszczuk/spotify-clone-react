import { useSelector } from "react-redux";
import { artistDetailsActions, artistDetailsSelectors } from "../../features/artistDetailsPage/slices/artistDetailsSlice";

export const useArtistDetails = (artistID) => {
    const { fetch: fetchArtistDetails, clear: clearArtistDetails } = artistDetailsActions;

    const artistDetailsStatus = useSelector(artistDetailsSelectors.selectStatus);
    const artistDetails = useSelector(artistDetailsSelectors.selectDatas)?.datas;

    const configs = { fetchAction: fetchArtistDetails, clearAction: clearArtistDetails, endpoint: `artists/${artistID}` };

    return { configs, artistDetails, artistDetailsStatus };
};