import { useDependentFetchAPI } from "./useDependentFetchAPI";

export const useArtistPopularReleases = ({ artistId, dependencies = [] }) => {

    const { datas: rawArtistTopTracksDatas, datasStatus: rawArtistTopTracksDatasStatus } = useDependentFetchAPI({
        endpoint: `artists/${artistId}/top-tracks`,
        fetchCondition: !!artistId,
        dependencies: [...dependencies],
    });


    const topTracksDatasList = rawArtistTopTracksDatas?.tracks;
    const topTracksAsAlbumsList = topTracksDatasList?.map(({ album }) => album);

    return { rawArtistTopTracksDatasStatus, topTracksAsAlbumsList, topTracksDatasList };
};