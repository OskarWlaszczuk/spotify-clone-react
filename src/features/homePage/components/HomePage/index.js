import { Main } from "../../../../common/components/Main";
import { albumsSelectors, albumsActions } from "../../slices/albumsSlice";
import { artistsSelectors, artistsActions } from "../../slices/artistsSlice";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "../MainContent";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useParams } from "react-router-dom";
import { useApiResource } from "../../../../common/hooks/useApiResource";

export const HomePage = () => {
    const { type } = useParams();

    const formatPopularListForFetch = (idsList) => idsList.join(",");

    const popularAlbumsIdsList = [
        "7LmeRZOi905AochW9J9FAA",
        "3mlLCrcrxfVkp5lUjgTgzl",
        "4utVyX1HOqeMkUeeHijTUT",
        "2ItrzcwLrygr4I6wlZ3HGU",
        "0oXsFefnFAsRabMYgCfuFf",
        "3pbJC94hUZST7m2coeIY6I",
        "02re9DV48w3DBMwnCR6S3Q",
        "4m2880jivSbbyEGAKfITCa",
    ];

    const popularArtistsIdsList = [
        "4tZwfgrHOc3mvqYlEYSvVi",
        "5NmRijhUHZnaADekOLcOyl",
        "0SD4eZCN4Kr0wQk56hCdh2",
        "3sW41aChSc5bBow0Folc1S",
        "0tdKRrbItnLj40yUFi23jx",
        "53XhwfbYqKCa1cC15pYq2q",
        "1fxbULcd6ryMNc1usHoP0R",
    ];

    const {
        configs: popularArtistsConfig,
        apiStatus: popularArtistsStatus,
        apiData: popularArtistsList
    } = useApiResource({
        actions: artistsActions,
        selectors: artistsSelectors,
        endpoint: `artists?ids=${formatPopularListForFetch(popularArtistsIdsList)}`,
    });

    const {
        configs: popularAlbumsConfig,
        apiStatus: popularAlbumsStatus,
        apiData: popularAlbumsList
    } = useApiResource({
        actions: albumsActions,
        selectors: albumsSelectors,
        endpoint: `albums?ids=${formatPopularListForFetch(popularAlbumsIdsList)}`,
    });

    const fetchStatus = useFetchStatus([popularArtistsStatus, popularAlbumsStatus]);

    useFetchAPI([popularArtistsConfig, popularAlbumsConfig]);

    return (
        <Main
            useGradient={!type}
            fetchStatus={fetchStatus}
            content={
                <MainContent
                    popularArtists={popularArtistsList?.artists}
                    popularAlbums={popularAlbumsList?.albums}
                />
            }
        />
    );
};