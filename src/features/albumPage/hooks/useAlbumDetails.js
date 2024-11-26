import { useSelector } from "react-redux";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { albumDetailsActions, albumDetailsSelectors } from "../slices/albumDetailsSlice";
import { getSpecificKeys } from "../../../common/functions/getSpecificKeys";

export const useAlbumDetails = (id) => {
    const { fetch: fetchAlbumDetails, clear: clearAlbumDetails } = albumDetailsActions;

    useFetchAPI(
        [{ fetchAction: fetchAlbumDetails, clearAction: clearAlbumDetails, endpoint: `albums/${id}` }],
        [id],
    );

    const albumDetailsStatus = useSelector(albumDetailsSelectors.selectStatus);
    const rawAlbumDetails = useSelector(albumDetailsSelectors.selectDatas)?.datas;

    const filteredAlbumData = getSpecificKeys(
        rawAlbumDetails,
        ["name", "images", "type", "release_date", "copyrights", "total_tracks", "tracks", "artists"]
    );

    return { filteredAlbumData, albumDetailsStatus };
};