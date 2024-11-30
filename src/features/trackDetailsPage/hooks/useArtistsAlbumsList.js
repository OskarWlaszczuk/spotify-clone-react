import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../common/slices/authSlice";
import { error, initial, loading, success } from "../../../common/constants/fetchStatuses";
import { fetchFromAPI } from "../../../common/functions/fetchFromAPI";

export const useArtistsAlbumsList = ({ artistsIdsList, artistsDataList, trackId }) => {
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
                            endpoint: `artists/${id}/albums?include_groups=album%2Csingle%2Ccompilation&limit=50`,
                            accessToken
                        })
                    }));

                    setArtistsAlbumsDataListStatus(success);
                    setArtistsAlbumsDataList(
                        artistsIdsList.map((artistId, index) => ({
                            id: artistId,
                            name: artistsDataList.find(({ id }) => id === artistId)?.name || '',
                            list: responses[index]?.items || []
                        }))
                    );
                } catch {
                    setArtistsAlbumsDataListStatus(error);
                }
            }
        };
        fetchArtistsAlbumsList();
    }, [trackId, accessToken, artistsDataList]);

    return { artistsAllReleasesDataList, artistsAllReleasesDataListStatus };
};