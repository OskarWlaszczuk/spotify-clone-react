import { useSelector } from "react-redux";
import { artistAlbumsActions, artistAlbumsSelectors } from "../../features/artistDetailsPage/slices/artistAlbumsSlice";
import { useFetchAPI } from "./useFetchAPI"

export const useArtistAllReleases = (artistID) => {
    const { fetch: fetchMainArtistAllReleasesList, clear: clearMainArtistAllReleasesList } = artistAlbumsActions;

    useFetchAPI([{
        fetchAction: fetchMainArtistAllReleasesList,
        clearAction: clearMainArtistAllReleasesList,
        endpoint: `artists/${artistID}/albums?include_groups=album%2Csingle%2Cappears_on%2Ccompilation&limit=50`
    }], [artistID]);

    const artistAllReleasesStatus = useSelector(artistAlbumsSelectors.selectStatus);
    const artistAllReleasesList = useSelector(artistAlbumsSelectors.selectDatas)?.datas.items;

    return { artistAllReleasesStatus, artistAllReleasesList };
};