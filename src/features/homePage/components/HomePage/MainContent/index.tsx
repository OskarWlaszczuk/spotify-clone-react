import { useParams } from "react-router-dom"
import { useRenderFacet } from "../../../hooks/useRenderFacet";
import { AlbumItem } from "../../../../../common/Interfaces/AlbumItem";
import { EpisodeItem } from "../../../../../common/Interfaces/EpisodeItem";
import { useViewByURL } from "../../../hooks/useURLBasedView ";
import { PopularLists } from "../../../interfaces/PopularLists";

interface MainContentProps {
    mediaSortedByCreator: (AlbumItem[] | EpisodeItem[])[];
    popularLists: PopularLists;
    newReleases: AlbumItem[];
}

export const MainContent = ({ mediaSortedByCreator, popularLists, newReleases }: MainContentProps) => {
    const { facetType } = useParams();

    const renderFacet = useRenderFacet(popularLists, facetType);

    const selectFacetConfigBasedOnType = useViewByURL({
        currentFacetType: facetType,
        mediaSortedByCreator,
        creatorsDetails: popularLists,
        newReleases,
    });

    return (
        <>
            {renderFacet()}
            {selectFacetConfigBasedOnType()}
        </>
    );
};