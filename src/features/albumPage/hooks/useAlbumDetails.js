import { useSelector } from "react-redux";
import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { albumDetailsActions, albumDetailsSelectors } from "../slices/albumDetailsSlice";
import { getImage } from "../../../common/functions/getImage";

export const useAlbumDetails = (albumID) => {

    const formatAlbumDetails = (rawAlbumDetails) => {
        return {
            name: rawAlbumDetails?.name,
            image: getImage(rawAlbumDetails?.images),
            type: rawAlbumDetails?.album_type,
            releaseDate: rawAlbumDetails?.release_date,
            copyrights: rawAlbumDetails?.copyrights,
            totalTracksNumber: rawAlbumDetails?.total_tracks,
            tracksList: rawAlbumDetails?.tracks.items,
            artistsList: rawAlbumDetails?.artists,
        };
    };

    const { fetch: fetchAlbumDetails, clear: clearAlbumDetails } = albumDetailsActions;

    useFetchAPI(
        [{ fetchAction: fetchAlbumDetails, clearAction: clearAlbumDetails, endpoint: `albums/${albumID}` }],
        [albumID],
    );

    const albumDetailsStatus = useSelector(albumDetailsSelectors.selectStatus);
    const rawAlbumDetails = useSelector(albumDetailsSelectors.selectDatas)?.datas;

    const formattedAlbumDetails = formatAlbumDetails(rawAlbumDetails);

    return { formattedAlbumDetails, albumDetailsStatus };
};