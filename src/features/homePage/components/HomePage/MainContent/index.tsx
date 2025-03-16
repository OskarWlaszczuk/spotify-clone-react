import { useParams } from "react-router-dom"
import { useRenderFacet } from "../../../hooks/useRenderFacet";
import { ArtistItem } from "../../../../../common/Interfaces/ArtistItem";
import { AlbumItem } from "../../../../../common/Interfaces/AlbumItem";
import { EpisodeItem } from "../../../../../common/Interfaces/EpisodeItem";
import { ShowItem } from "../../../../../common/Interfaces/ShowItem";
import { toHome } from "../../../../../common/functions/routes";
import { CategoryConfig } from "../../../../../common/components/CategoriesSwitchersSection/CategoryConfig";
import { facetAllCategory, facetMusicCategory, facetPodcastsCategory } from "../../../constants/facetCategories";
import { useSelectFacetConfigBasedOnType } from "../../../functions/selectFacetConfigBasedOnType";
import { mixLists } from "../../../functions/mixLists";
interface PopularLists {
    artists: ArtistItem[];
    albums: AlbumItem[];
    episodes: EpisodeItem[];
    shows: ShowItem[];
}

interface MainContentProps {
    mediaSortedByCreator: (AlbumItem[] | EpisodeItem[])[];
    popularLists: PopularLists;
    newReleases: AlbumItem[];
}

export const MainContent = ({ mediaSortedByCreator, popularLists, newReleases }: MainContentProps) => {
    const { facetType } = useParams();
    const { episodes, albums, artists, shows } = popularLists;

    const allViewFacetList = mixLists(2, albums, shows, artists, episodes);
    const musicViewList = mixLists(4, albums, artists);

    const facetCategoriesConfig2: CategoryConfig[] = [
        {
            pathname: toHome({ facetType: facetAllCategory }),
            categoryView: allViewFacetList,
            categoryName: facetAllCategory,
            categorySwitcherContent: "All"
        },
        {
            pathname: toHome({ facetType: facetMusicCategory }),
            categoryView: musicViewList,
            categoryName: facetMusicCategory,
            categorySwitcherContent: "Music"
        },
        {
            pathname: toHome({ facetType: facetPodcastsCategory }),
            categoryView: shows,
            categoryName: facetPodcastsCategory,
            categorySwitcherContent: "Podcasts"
        },
    ];

    const renderFacet = useRenderFacet(facetCategoriesConfig2, facetType);

    const selectFacetConfigBasedOnType = useSelectFacetConfigBasedOnType({
        currentFacetType: facetType,
        mediaSortedByCreator,
        creatorsDetails: popularLists,
        newReleases,
    })

    return (
        <>
            {renderFacet()}
            {selectFacetConfigBasedOnType()}
        </>
    );
};