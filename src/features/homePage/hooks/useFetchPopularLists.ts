import { popularAlbumsIdsList, popularArtistsIdsList, popularEpisodesIdsList, popularShowsIdsList } from "../constants/popularListsIds";
import { useFetchSeveralEpisodes } from "../../../common/hooks/useFetchSeveralEpisodes";
import { useFetchSeveralArtists } from "../../../common/hooks/useFetchSeveralArtists";
import { useFetchSeveralAlbums } from "../../../common/hooks/useFetchSeveralAlbums";
import { useFetchSeveralShows } from "../../../common/hooks/useFetchSeveralShows";

export const useFetchPopularLists = () => {
    const { albums, albumsStatus } = useFetchSeveralAlbums({ IDs: popularAlbumsIdsList });
    const { artists, artistsStatus } = useFetchSeveralArtists({ IDs: popularArtistsIdsList });
    const { episodes, episodesStatus } = useFetchSeveralEpisodes({ IDs: popularEpisodesIdsList });
    const { shows, showsStatus } = useFetchSeveralShows({ IDs: popularShowsIdsList });

    const popularListsStatuses = [albumsStatus, artistsStatus, episodesStatus, showsStatus];
    const popularLists = { albums, artists, episodes, shows };

    return { popularListsStatuses, popularLists };
};