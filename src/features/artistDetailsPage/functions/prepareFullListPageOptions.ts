import { allReleaseParamDiscography, albumsParamDiscography, compilationParamDiscography, singleParamDiscography } from "../../../common/constants/artistDiscographyParams";
import { sortFromOldestToNewest } from "../../../common/functions/sortFromOldestToNewest";
import { FullListPageOption } from "../../../common/Interfaces/FullListPageOption";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { artistAppearsOnParam } from "../constants/FullListPageParams";
import { divideReleases } from "./divideReleases";
import { preparePopularReleases } from "./preparePopularReleases";

interface PrepareFullListPageOptionsParameters {
    artistAllReleases: AlbumItem[];
    artistTopTracksAsAlbums: AlbumItem[];
    artistName: string;
};

export const prepareFullListPageOptions = ({ artistAllReleases, artistTopTracksAsAlbums, artistName }: PrepareFullListPageOptionsParameters) => {
    const {
        albumsList,
        compilationsList,
        singlesList,
        appearsOnList,
        allReleasesWithoutAppearsOn,
    } = divideReleases(artistAllReleases);

    const uniquePopularReleases = preparePopularReleases(artistTopTracksAsAlbums, allReleasesWithoutAppearsOn);

    const baseDiscographyData = {
        title: artistName,
        isArtistsList: false,
    };

    const fullListPageOptions: FullListPageOption[] = [
        {
            key: allReleaseParamDiscography,
            value: sortFromOldestToNewest(uniquePopularReleases),
            ...baseDiscographyData,
        },
        {
            key: albumsParamDiscography,
            value: albumsList,
            ...baseDiscographyData,
        },
        {
            key: compilationParamDiscography,
            value: compilationsList,
            ...baseDiscographyData,
        },
        {
            key: singleParamDiscography,
            value: singlesList,
            ...baseDiscographyData,
        },
        {
            key: artistAppearsOnParam,
            value: appearsOnList,
            title: "Appears On",
            isArtistsList: false
        },
    ];

    return fullListPageOptions;
};