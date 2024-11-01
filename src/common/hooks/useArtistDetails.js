import { useSelector } from "react-redux";
import { artistDetailsActions, artistDetailsSelectors } from "../../features/artistDetailsPage/slices/artistDetailsSlice";
import { useFetchAPI } from "./useFetchAPI";

export const useArtistDetails = (artistID) => {
    const { fetch: fetchArtistDetails, clear: clearArtistDetails } = artistDetailsActions;

    useFetchAPI([{
        fetchAction: fetchArtistDetails,
        clearAction: clearArtistDetails,
        endpoint: `artists/${artistID}`
    }], [artistID]);

    const artistDetailsStatus = useSelector(artistDetailsSelectors.selectStatus);
    const artistDetails = useSelector(artistDetailsSelectors.selectDatas)?.datas;

    return { artistDetailsStatus, artistDetails };
}