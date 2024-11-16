import { Main } from "../../../../common/components/Main";
import { useSelector } from "react-redux";
import { albumsSelectors, albumsActions } from "../../slices/albumsSlice";
import { artistsSelectors, artistsActions } from "../../slices/artistsSlice";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "../MainContent";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useParams } from "react-router-dom";
import { FetchStatus } from "../../../../common/types/FetchStatus";
import { useApiData } from "../../../../common/hooks/useApiData";

export const HomePage = () => {
    const { type } = useParams();

    const albumsIDs = "382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc,4bNiBmPncdmzzWdeUSs7DF";
    const artistsIDs = "4tZwfgrHOc3mvqYlEYSvVi,3hteYQFiMFbJY7wS0xDymP,7CJgLPEqiIRuneZSolpawQ,0tdKRrbItnLj40yUFi23jx,1fxbULcd6ryMNc1usHoP0R,0MIG6gMcQTSvFbKvUwK0id,1Xyo4u8uXC1ZmMpatF05PJ";

    const { fetch: fetchAlbums, clear: clearAlbums } = albumsActions;

    const {
        configs: artistsDetailsListConfigs,
        status: artistsDetailsListStatus,
        datas: artistsDetailsList
    } = useApiData(artistsActions, artistsSelectors, `artists?ids=${artistsIDs}`);

    const albumsStatus: FetchStatus = useSelector(albumsSelectors.selectStatus);

    const fetchStatus = useFetchStatus([albumsStatus, artistsDetailsListStatus]);

    useFetchAPI([
        artistsDetailsListConfigs,
        { fetchAction: fetchAlbums, clearAction: clearAlbums, endpoint: `albums?ids=${albumsIDs}` },
    ]);

    return (
        <Main useGradient={!type} fetchStatus={fetchStatus} content={<MainContent artistsDetailsList={artistsDetailsList?.artists} />} />
    );
};
