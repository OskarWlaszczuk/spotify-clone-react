import { useParams } from "react-router-dom";
import { Table } from "../../../../../common/components/Table";
import { toAlbum, toArtist } from "../../../../../common/functions/routes";
import { useCurrentCategoryData } from "../../../hooks/useCurrentCategoryData";
import { findMatchingOptionByKey } from "../../../../../common/functions/findMatchingOptionByKey";
import {
    albumsCategory,
    compilationsCategory,
    popularReleasesCategory,
    singlesCategory
} from "../../../constants/releasesCategories";
import {
    allReleaseParamDiscography,
    albumsParamDiscography,
    singleParamDiscography,
    compilationParamDiscography
} from "../../../../../common/constants/artistDiscographyParams";
import { sortFromOldestToNewest } from "../../../../../common/functions/sortFromOldestToNewest";
import { fullListLinkText } from "../../../../../common/constants/fullListLinkText ";
import { removeDuplicatesByName } from "../../../../../common/functions/removeDuplicatesByName";
import { CategoriesSwitchersSection } from "../../../../../common/components/CategoriesSwitchersSection";
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList";
import { divideReleases } from "../../../functions/divideReleases";
import { preparePopularReleases } from "../../../functions/preparePopularReleases";
import { useRenderFullList } from "../../../../../common/functions/useRenderFullList";
import { artistAppearsOnParam } from "../../../constants/FullListPageParams";
import { CategoryData } from "../../../../../common/Interfaces/CategoryData";
import { FullListPageOption } from "../../../../../common/Interfaces/FullListPageOption";
import { useRenderDiscography } from "../../../functions/renderDiscography";

interface TopTracksData {
    list: any;
    listAsAlbums: any;
};

interface ArtistsData {
    name: string;
    allReleasesList: any,
    topTracksData: TopTracksData
};

interface MainContentProps {
    artistsData: ArtistsData;
};

export const MainContent = ({
    artistsData: {
        name,
        allReleasesList,
        topTracksData: {
            list,
            listAsAlbums
        }
    }
}: MainContentProps) => {

    const { id: artistId, type = "" } = useParams();
    const renderTilesList = useRenderTilesList();

    const {
        albumsList,
        compilationsList,
        singlesList,
        appearsOnList,
        allReleasesWithoutAppearsOn,
    } = divideReleases(allReleasesList);

    const uniquePopularReleases = preparePopularReleases(listAsAlbums, allReleasesWithoutAppearsOn);

    const baseDiscographyData = {
        title: name,
        isArtistsList: false,
    };

    const fullListPageOptions:FullListPageOption[] = [
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

    const renderFullList = useRenderFullList();
    const renderDiscography = useRenderDiscography(allReleasesList, listAsAlbums);
 
    const renderTilesListSections = () => (
        renderTilesList([
            {
                title: "Appears on",
                list: appearsOnList,
                toPageFunction: toAlbum,
                fullListData: {
                    pathname: toArtist({ id: artistId!, additionalPath: artistAppearsOnParam }),
                    text: fullListLinkText,
                }
            },
        ])
    );

    return (
        <>
            {
                type ?
                    renderFullList(fullListPageOptions, type) :
                    (
                        <>
                            <Table list={list} caption="Popular" />
                            {renderDiscography()}
                            {renderTilesListSections()}
                        </>
                    )
            }
        </>
    );
};