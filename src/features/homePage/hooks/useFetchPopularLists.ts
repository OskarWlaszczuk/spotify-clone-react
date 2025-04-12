import { popularAlbumsIdsList, popularArtistsIdsList, popularEpisodesIdsList, popularShowsIdsList } from "../constants/popularListsIds";
import { useFetchSeveralEpisodes } from "../../../common/hooks/useFetchSeveralEpisodes";
import { useFetchSeveralArtists } from "../../../common/hooks/useFetchSeveralArtists";
import { useFetchSeveralAlbums } from "../../../common/hooks/useFetchSeveralAlbums";
import { useFetchSeveralShows } from "../../../common/hooks/useFetchSeveralShows";

export const useFetchPopularLists = (facetType: string) => {

    const albums = useFetchSeveralAlbums({ IDs: popularAlbumsIdsList });
    const artists = useFetchSeveralArtists({ IDs: popularArtistsIdsList });
    const episodes = useFetchSeveralEpisodes({ IDs: popularEpisodesIdsList });
    const shows = useFetchSeveralShows({ IDs: popularShowsIdsList });

    const popularData = { albums, artists, episodes, shows };
    const popularDataAsList = [albums, artists, episodes, shows];

    const popularListsStatuses = popularDataAsList.map(({ status }) => status);
    const popularLists = Object.fromEntries(
        Object.entries(popularData).map(([key, value]) => [key, value.list])
    );

    return { popularListsStatuses, popularLists };
};