import { Main } from "../../../../common/components/Main";
import { albumsSelectors, albumsActions } from "../../slices/albumsSlice";
import { artistsSelectors, artistsActions } from "../../slices/artistsSlice";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "../MainContent";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useParams } from "react-router-dom";
import { useApiData2 } from "../../../../common/hooks/useApiData";

const formatApiResources = (apiResources: any) => {
    const configs = apiResources.map(({ configs }: any) => configs);
    const datas = apiResources.map(({ datas }: any) => datas);
    const statuses = apiResources.map(({ status }: any) => status);

    return { configs, datas, statuses };
};

export const HomePage = () => {
    const { type } = useParams();

    const albumsIDs = "382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc,4bNiBmPncdmzzWdeUSs7DF";
    const artistsIDs = "4tZwfgrHOc3mvqYlEYSvVi,3hteYQFiMFbJY7wS0xDymP,7CJgLPEqiIRuneZSolpawQ,0tdKRrbItnLj40yUFi23jx,1fxbULcd6ryMNc1usHoP0R,0MIG6gMcQTSvFbKvUwK0id,1Xyo4u8uXC1ZmMpatF05PJ";

    const apiResources = useApiData2([
        {
            action: artistsActions,
            selectors: artistsSelectors,
            endpoint: `artists?ids=${artistsIDs}`
        },
        {
            action: albumsActions,
            selectors: albumsSelectors,
            endpoint: `albums?ids=${albumsIDs}`,
        }
    ]);

    const { configs, datas, statuses } = formatApiResources(apiResources);

    const popularArtistsList = datas?.[0]?.artists;
    const popularAlbumsList = datas?.[1]?.albums;

    const fetchStatus = useFetchStatus([...statuses]);

    useFetchAPI([...configs]);

    return (
        <Main
            useGradient={!type}
            fetchStatus={fetchStatus}
            content={
                <MainContent
                    popularArtists={popularArtistsList}
                    popularAlbums={popularAlbumsList}
                />
            }
        />
    );
};