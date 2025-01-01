import { useParams } from "react-router-dom"
import { popularAlbumsParam, popularArtistsParam } from "../../../constants/fullListPageParams";
import { useRenderFullList } from "../../../../../common/functions/useRenderFullList";
import { popularAlbumsTitle, popularArtistsTitle } from "../../../constants/popularListsTitles";
import { useRenderPopularLists } from "../../../hooks/useRenderPopularLists";
import { FullListPageOption } from "../../../../../common/Interfaces/FullListPageOption";
import { PopularListConfig } from "../../../interfaces/PopularListConfig";
import { useRenderFacet } from "../../../hooks/useRenderFacet";
import { ArtistItem } from "../../../../../common/Interfaces/ArtistItem";
import { AlbumItem } from "../../../../../common/Interfaces/AlbumItem";
import { EpisodeItem } from "../../../../../common/Interfaces/EpisodeItem";
import { useRenderArtistReleaseSections } from "../../../../../common/hooks/useRenderArtistReleaseSections";

interface ArtistAllReleasesData {
    id: string;
    name: string;
    releases: AlbumItem[];
    listId: number;
}

type PopularLists = [AlbumItem[], ArtistItem[], EpisodeItem[]]

interface MainContentProps {
    popularLists: PopularLists
    artistsAllReleasesDataList: ArtistAllReleasesData[];
}

export const MainContent = ({
    popularLists,
    artistsAllReleasesDataList,
}: MainContentProps) => {

    const [popularAlbums, popularArtists, popularEpisodes] = popularLists;

    const { fullListType, facetType } = useParams();

    const renderFullList = useRenderFullList()
    const renderPopularLists = useRenderPopularLists();
    const renderFacet = useRenderFacet(popularAlbums, popularEpisodes);
    const renderArtistsReleasesSection = useRenderArtistReleaseSections();

    const fullListPageOptions: FullListPageOption[] = [
        { key: popularAlbumsParam, value: popularAlbums, title: popularAlbumsTitle, isArtistsList: false },
        { key: popularArtistsParam, value: popularArtists, title: popularArtistsTitle, isArtistsList: true },
    ];

    const popularListsConfig: PopularListConfig[] = [
        {
            title: popularAlbumsTitle,
            list: popularAlbums,
            fullListType: popularAlbumsParam,
            isArtistsList: false,
        },
        {
            title: popularArtistsTitle,
            list: popularArtists,
            fullListType: popularArtistsParam,
            isArtistsList: true,
        },
    ];

    // const findMatchingPopularListConfigByFacet = (currentFacetName: any) => {
    //     const array = [
    //         {
    //             key: facetMusicCategory,

    //         }
    //     ]
    // }


    return (
        <>
            {
                fullListType ?
                    renderFullList(fullListPageOptions, fullListType) :
                    (
                        <>
                            {renderFacet()}
                            {renderArtistsReleasesSection(artistsAllReleasesDataList, popularArtists)}
                            {/* {renderPopularLists(popularListsConfig)} */}
                        </>
                    )

            }
        </>
    )
};