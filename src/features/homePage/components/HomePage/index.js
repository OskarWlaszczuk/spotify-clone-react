import {Main} from "../../../../common/components/Main";
import {useFetchStatus} from "../../../../common/hooks/useFetchStatuses";
import {MainContent} from "./MainContent";
import {useFetchAPI} from "../../../../common/hooks/useFetchAPI";
import {useParams} from "react-router-dom";
import {usePopularLists} from "../../hooks/usePopularLists";
import {getSpecificKeys} from "../../../../common/functions/getSpecificKeys";

export const HomePage = () => {
    const {type} = useParams();
    const homeId = "home"

    const {configs, apiStatuses, apiDataList} = usePopularLists();

    const [
        {albums: popularAlbumsList},
        {artists: popularArtistsList},
    ] = getSpecificKeys(apiDataList, ["albums", "artists"]);

    const fetchStatus = useFetchStatus([...apiStatuses]);

    useFetchAPI({fetchConfigs: [...configs], pageId: homeId});

    return (
        <Main
            useGradient={!type}
            currentFetchStatus={fetchStatus}
            content={
                <MainContent
                    popularArtists={popularArtistsList}
                    popularAlbums={popularAlbumsList}
                />
            }
        />
    );
};