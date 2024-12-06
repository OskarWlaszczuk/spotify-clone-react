import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../common/slices/authSlice";
import { error, initial, loading, success } from "../../../common/constants/fetchStatuses";
import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";
import { getArtistReleasesEndpointResource } from "../../../common/functions/getArtistReleasesEndpointResource";

export const useArtistsAlbumsList = ({ artistsIdsList, artistsDetailsList, trackId }) => {
    const accessToken = useSelector(selectAccessToken);

    const [artistsAllReleasesDataList, setArtistsAlbumsDataList] = useState(undefined);
    const [artistsAllReleasesDataListStatus, setArtistsAlbumsDataListStatus] = useState(initial);

    useEffect(() => {
        const fetchArtistsAlbumsList = async () => {
            if (!!artistsIdsList && !!accessToken) {
                try {
                    setArtistsAlbumsDataListStatus(loading);
                    const responses = await Promise.all(artistsIdsList.map(id => {
                        return fetchFromAPI({
                            endpoint: `artists/${id}/${getArtistReleasesEndpointResource()}`,
                            accessToken
                        })
                    }));

                    setArtistsAlbumsDataListStatus(success);
                    setArtistsAlbumsDataList(
                        artistsIdsList.map((artistId, index) => ({
                            id: artistId,
                            name: artistsDetailsList.find(({ id }) => id === artistId)?.name || '',
                            list: responses[index]?.items || [],
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