import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../common/slices/authSlice";
import { error, initial, loading, success } from "../../../common/constants/fetchStatuses";
import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";
import { getArtistReleasesEndpoint, getShowEpisodes } from "../../../common/functions/endpoints";

export const useArtistsAlbumsList = ({ artistsDetailsList, trackId = "" }) => {
    const accessToken = useSelector(selectAccessToken);
    const artistsIdsList = artistsDetailsList?.map(({ id }) => id);

    const [artistsAllReleasesDataList, setArtistsAlbumsDataList] = useState(undefined);
    const [artistsAllReleasesDataListStatus, setArtistsAlbumsDataListStatus] = useState(initial);

    useEffect(() => {
        const fetchArtistsAlbumsList = async () => {
            if (!!accessToken && !!artistsDetailsList) {
                try {
                    setArtistsAlbumsDataListStatus(loading);
                    const responses = await Promise.all(artistsIdsList.map(id => {
                        return fetchFromAPI({
                            endpoint: getArtistReleasesEndpoint({ id }),
                            accessToken
                        })
                    }));

                    setArtistsAlbumsDataListStatus(success);
                    setArtistsAlbumsDataList(
                        artistsIdsList.map((artistId, index) => ({
                            id: artistId,
                            name: artistsDetailsList.find(({ id }) => id === artistId)?.name || '',
                            releases: responses[index]?.items || [],
                            listId: Math.random()
                        }))
                    );

                } catch {
                    setArtistsAlbumsDataListStatus(error);
                }
            }
        };
        fetchArtistsAlbumsList();
    }, [trackId, accessToken, artistsDetailsList]);

    return { artistsAllReleasesDataList, artistsAllReleasesDataListStatus };
};



export const useArtistsAlbumsList2 = ({ showsDetailsList, trackId = "" }) => {
    const accessToken = useSelector(selectAccessToken);

    const showsIds = showsDetailsList?.map(({ id }) => id);

    const [episodesGroupedByShows, setEpisodesGroupedByShows] = useState(undefined);
    const [episodesGroupedByShowsStatus, setEpisodesGroupedByShowsStatus] = useState(initial);

    useEffect(() => {
        const fetchArtistsAlbumsList = async () => {
            if (!!accessToken && !!showsDetailsList) {
                try {
                    setEpisodesGroupedByShowsStatus(loading);
                    const responses = await Promise.all(showsIds.map(id => {
                        return fetchFromAPI({
                            endpoint: getShowEpisodes({ id }),
                            accessToken
                        })
                    }));
                    // console.log(responses)
                    setEpisodesGroupedByShowsStatus(success);
                    setEpisodesGroupedByShows(
                        showsIds.map((showId, index) => ({
                            id: showId,
                            name: showsDetailsList.find(({ id }) => id === showId)?.name || '',
                            releases: responses[index]?.items || [],
                            listId: Math.random()
                        }))
                    );

                } catch {
                    setEpisodesGroupedByShowsStatus(error);
                }
            }
        };
        fetchArtistsAlbumsList();
    }, [trackId, accessToken, showsDetailsList]);

    return { episodesGroupedByShows, episodesGroupedByShowsStatus };
};