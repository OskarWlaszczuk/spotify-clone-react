import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { ArtistItem } from "../../../common/Interfaces/ArtistItem";
import { EpisodeItem } from "../../../common/Interfaces/EpisodeItem";
import { ShowItem } from "../../../common/Interfaces/ShowItem";
import { facetAllCategory, facetMusicCategory, facetPodcastsCategory } from "../constants/facetCategories";
import { useRenderMediaSectionsSortedByCreators } from "./useRenderArtistsReleasesSections";
import { useRenderNewReleases } from "./useRenderNewReleases";
import { FacetType } from "../interfaces/FacetType";
import { MediaSortedByCreator } from "../types/MediaSortedByCreator";

interface PopularLists {
    artists: ArtistItem[];
    albums: AlbumItem[];
    episodes: EpisodeItem[];
    shows: ShowItem[];
}

interface useViewByURLParams {
    currentFacetType: FacetType;
    mediaSortedByCreator: MediaSortedByCreator;
    creatorsDetails: Pick<PopularLists, "artists" | "shows">;
    newReleases: AlbumItem[];
}

export const useViewByURL = ({ currentFacetType, mediaSortedByCreator, creatorsDetails, newReleases }: useViewByURLParams) => {

    const renderMediaSectionsSortedByCreators = useRenderMediaSectionsSortedByCreators();
    const renderNewReleasesSection = useRenderNewReleases(newReleases);

    const selectViewByURL = () => {
        switch (currentFacetType) {
            case facetAllCategory:
                return <>{renderNewReleasesSection()}</>
            case facetMusicCategory:
                return <>{renderMediaSectionsSortedByCreators(mediaSortedByCreator, creatorsDetails?.artists)}</>
            case facetPodcastsCategory:
                return <>{renderMediaSectionsSortedByCreators(mediaSortedByCreator, creatorsDetails?.shows)}</>

            default:
                return <>All</>
        };
    };

    return selectViewByURL;
};
