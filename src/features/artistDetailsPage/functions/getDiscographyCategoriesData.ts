import {
    albumsParamDiscography,
    compilationParamDiscography,
    popularReleasesParamDiscography,
    singleParamDiscography
} from "../../../common/constants/artistDiscographyParams";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { ArtistItem } from "../../../common/Interfaces/ArtistItem";

interface GroupedReleases {
    album: AlbumItem[];
    single: AlbumItem[];
    compilation: AlbumItem[];
}

export const getDiscographyCategoriesData = (groupedReleases: GroupedReleases, popularReleases: AlbumItem[], artistName: ArtistItem["name"]) => {
    const baseFullListPageData = {
        listTitle: artistName,
        isArtistsList: false,
    };

    return [
        {
            releaseList: popularReleases,
            releaseType: popularReleasesParamDiscography,
            ...baseFullListPageData,
            switcherButtonContent: "Popular releases",
        },
        {
            releaseList: groupedReleases.album,
            releaseType: albumsParamDiscography,
            ...baseFullListPageData,
            switcherButtonContent: "Albums",
        },
        {
            releaseList: groupedReleases.single,
            releaseType: singleParamDiscography,
            ...baseFullListPageData,
            switcherButtonContent: "Singles and EPs",
        },
        {
            releaseList: groupedReleases.compilation,
            releaseType: compilationParamDiscography,
            ...baseFullListPageData,
            switcherButtonContent: "Compilations",
        },
    ];
};