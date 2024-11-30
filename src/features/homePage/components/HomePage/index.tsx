import { Main } from "../../../../common/components/Main";
import { albumsSelectors, albumsActions } from "../../slices/albumsSlice";
import { artistsSelectors, artistsActions } from "../../slices/artistsSlice";
import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { MainContent } from "../MainContent";
import { useFetchAPI } from "../../../../common/hooks/useFetchAPI";
import { useParams } from "react-router-dom";
import { useApiResources } from "../../../../common/hooks/useApiResources";

export const HomePage = () => {
    const { type } = useParams();

    const formatPopularListForFetch = (idsList: any) => idsList.join(",");

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

    const { configs, apiData, statuses } = useApiResources([
        {
            action: artistsActions,
            selectors: artistsSelectors,
            endpoint: `artists?ids=${formatPopularListForFetch(popularArtistsIdsList)}`
        },
        {
            action: albumsActions,
            selectors: albumsSelectors,
            endpoint: `albums?ids=${formatPopularListForFetch(popularAlbumsIdsList)}`,
        },
    ]);

    const popularArtistsList = apiData?.[0]?.artists;
    const popularAlbumsList = apiData?.[1]?.albums;

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