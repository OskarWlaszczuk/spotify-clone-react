import { Main } from "../../../../common/components/Main";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "./MainContent";
import { useParams } from "react-router-dom";
import { useFetchPopularLists } from "../../hooks/useFetchPopularLists";
import { useArtistsAlbumsList, useArtistsAlbumsList3 } from "../../../trackDetailsPage/hooks/useArtistsAlbumsList";
import { useApiResource } from "../../../../common/hooks/useApiResource";
import { artistDetailsActions, artistDetailsSelectors } from "../../../../common/slices/artistDetailsSlice";
import { getAlbumDetailsEndpoint, getArtistDetailsEndpoint } from "../../../../common/functions/endpoints";
import { useFetch } from "../../../../common/hooks/useFetchAPI";
import { useEffect, useMemo, useRef } from "react";
import { albumDetailsActions, albumDetailsSelectors } from "../../../../common/slices/albumDetailsSlice";
import { popularArtistsIdsList } from "../../constants/popularListsIds";

export const HomePage = () => {
    const { fullListType } = useParams();

    const { popularListsStatuses, popularLists } = useFetchPopularLists();
    
    const { releasesGroupedByArtists, releasesGroupedByArtistsStatus } = useArtistsAlbumsList3({ artistsDetailsList: popularLists[0] });
  
    const fetchStatus = useFetchStatus([...popularListsStatuses, releasesGroupedByArtistsStatus]);

    return (
        // <Main
        //     useGradient={!fullListType}
        //     currentFetchStatus={fetchStatus}
        //     content={
        //         <MainContent
        //             popularLists={popularLists}
        //             artistsAllReleasesDataList={artistsReleases}
        //         />
        //     }
        // />
        <></>
    );
};