import { useParams } from "react-router-dom"
import { useRenderFacet } from "../../../hooks/useRenderFacet";
import { ArtistItem } from "../../../../../common/Interfaces/ArtistItem";
import { AlbumItem } from "../../../../../common/Interfaces/AlbumItem";
import { EpisodeItem } from "../../../../../common/Interfaces/EpisodeItem";
import { ShowItem } from "../../../../../common/Interfaces/ShowItem";
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList";
import { toArtist, toHome, toShow } from "../../../../../common/functions/routes";
import { getFirstImage } from "../../../../../common/functions/getFirstImage";
import { MediaItem } from "../../../../../common/Interfaces/MediaItem";
import { CategoryConfig } from "../../../../../common/components/CategoriesSwitchersSection/CategoryConfig";
import { facetAllCategory, facetMusicCategory, facetPodcastsCategory } from "../../../constants/facetCategories";
import { allReleaseParamDiscography } from "../../../../../common/constants/artistDiscographyParams";
import { fullListLinkText } from "../../../../../common/constants/fullListLinkText ";
import { getAlbumArtists } from "../../../../../common/functions/getAlbumArtists";
import { ArtistsList } from "../../../../../common/Interfaces/ArtistsList";

const mixLists = (count: number, ...arrays: MediaItem[][]): MediaItem[] => {
    const mixedList: MediaItem[] = [];

    const selectedArrays = arrays?.map(arr => arr?.slice(0, count));

    for (let i = 0; i < count; i++) {
        for (const arr of selectedArrays) {
            if (arr?.[i] !== undefined) {
                mixedList?.push(arr[i]);
            }
        }
    };

    return mixedList;
};

interface PopularLists {
    artists: ArtistItem[];
    albums: AlbumItem[];
    episodes: EpisodeItem[];
    shows: ShowItem[];
}

interface MainContentProps {
    mediaSortedByCreator: (AlbumItem[] | EpisodeItem[])[];
    popularLists: PopularLists
}

export const MainContent = ({ mediaSortedByCreator, popularLists }: MainContentProps) => {

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
    const renderTilesList = useRenderTilesList();

    const renderArtistsReleasesSections = () => (
        mediaSortedByCreator?.map((artistReleases, index) => {
            const { images, name, id } = artists[index]

            return (
                renderTilesList([{
                    title: name,
                    list: artistReleases,
                    fullListData: {
                        pathname: toArtist({ id, fullListType: allReleaseParamDiscography }),
                        text: fullListLinkText
                    },
                    listId: index,
                    overTitleExtraContent: "Popular Releases",
                    extraTitleImage: {
                        imageURL: getFirstImage(images),
                        isArtistImage: true,
                    },
                    renderSubInfo: ({ artists }: ArtistsList) => getAlbumArtists(artists),
                    titleLink: toArtist({ id }),
                }])
            );
        })
    );

    const renderShowsEpisodesSections = () => (
        mediaSortedByCreator?.map((showsEpisodes, index) => {
            const { name, id, publisher, images } = shows[index]

            return (
                renderTilesList([{
                    title: name,
                    list: showsEpisodes,
                    // fullListData: {
                    //     pathname: toArtist({ id, fullListType: allReleaseParamDiscography }),
                    //     text: fullListLinkText
                    // },
                    listId: index,
                    overTitleExtraContent: "Popular Episodes",
                    extraTitleImage: {
                        imageURL: getFirstImage(images),
                        isArtistImage: true,
                    },
                    subInfo: publisher,
                    titleLink: toShow({ id }),
                }])
            );
        })
    );


    const selectFacetConfigBasedOnType = (currentFacetType: string | undefined) => {
        switch (currentFacetType) {
            case facetAllCategory:
                return <>All</>
            case facetMusicCategory:
                return <>{renderArtistsReleasesSections()}</>
            case facetPodcastsCategory:
                return <>{renderShowsEpisodesSections()}</>

            default:
                <>sss</>
        };
    };

    return (
        <>
            {renderFacet()}
            {selectFacetConfigBasedOnType(facetType)}
        </>
    );
};