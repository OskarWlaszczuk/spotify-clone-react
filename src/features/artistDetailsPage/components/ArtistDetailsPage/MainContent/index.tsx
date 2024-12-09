import { useParams } from "react-router-dom";
import { Table } from "../../../../../common/components/Table";
import { toAlbum, toArtist } from "../../../../../common/functions/routes";
import { useCurrentCategoryData } from "../../../hooks/useCurrentCategoryData";
import { findMatchingValueByKey } from "../../../../../common/functions/findMatchingValueByKey";
import { getFullListMatchedData } from "../../../../../common/functions/getFullListMatchedData";
import {
    albumsCategory,
    compilationsCategory,
    popularReleasesCategory,
    singlesCategory
} from "../../../constants/categories";
import {
    allReleaseParamDiscography,
    albumsParamDiscography,
    singleParamDiscography,
    artistAppearsOnParam,
    compilationParamDiscography
} from "../../../../../common/constants/params";
import { sortFromOldestToNewest } from "../../../../../common/functions/sortFromOldestToNewest";
import { fullListLinkText } from "../../../../../common/constants/fullListLinkText ";
import { removeDuplicates } from "../../../../../common/functions/removeDuplicates";
import { ListToggleButtonsSection } from "../../../../../common/components/ListToggleButtonsSection";
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList";
import { prepareReleases } from "../../../functions/prepareReleases";
import { preparePopularReleases } from "../../../functions/preparePopularReleases";

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

    const { id: artistId, type = "" } = useParams<{ id: string; type?: string }>();
    const renderTilesList = useRenderTilesList();

    const {
        albumsList,
        compilationsList,
        singlesList,
        appearsOnList,
        allReleasesWithoutAppearsOn,
    } = prepareReleases(allReleasesList);

    const uniquePopularReleases = preparePopularReleases(listAsAlbums, allReleasesWithoutAppearsOn);

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({
        key: popularReleasesCategory,
        value: uniquePopularReleases,
    });

    const discographyData = {
        title: name,
        isArtistsList: false,
    };

    const fullListsDataOptions = [
        {
            key: allReleaseParamDiscography,
            value: sortFromOldestToNewest(uniquePopularReleases),
            ...discographyData,
        },
        {
            key: albumsParamDiscography,
            value: albumsList,
            ...discographyData,
        },
        {
            key: compilationParamDiscography,
            value: compilationsList,
            ...discographyData,
        },
        {
            key: singleParamDiscography,
            value: singlesList,
            ...discographyData,
        },
        {
            key: artistAppearsOnParam,
            value: appearsOnList,
            title: "Appears On",
            isArtistsList: false
        },
    ];

    const { fullListContent, fullListTitle, isFullListArtistsList } = getFullListMatchedData(fullListsDataOptions, type);

    const renderFullList = () => {
        return renderTilesList([
            {
                title: fullListTitle,
                list: removeDuplicates({ list: fullListContent, key: "name" }),
                toPageFunction: isFullListArtistsList ? toArtist : toAlbum,
                isArtistsList: isFullListArtistsList,
                isuseHideRestListPart: false,
                isRenderSubInfo: true,
            },
        ]);
    };

    const renderTilesListSections = () => {
        const generateFullListData = (additionalPath: any) => ({
            pathname: toArtist({ id: artistId!, additionalPath }),
            text: fullListLinkText,
        });

        const listToggleButtonDataList = [
            { list: uniquePopularReleases, category: popularReleasesCategory, text: "Popular releases" },
            { list: albumsList, category: albumsCategory, text: "Albums" },
            { list: singlesList, category: singlesCategory, text: "Singles and EPs" },
            { list: compilationsList, category: compilationsCategory, text: "Compilations" },
        ];

        const additionalPathsOptionsGrouped = [
            { key: popularReleasesCategory, value: allReleaseParamDiscography },
            { key: albumsCategory, value: albumsParamDiscography },
            { key: compilationsCategory, value: compilationParamDiscography },
            { key: singlesCategory, value: singleParamDiscography },
        ];

        return (
            renderTilesList([
                {
                    title: "Discography",
                    subExtraContent: (
                        <ListToggleButtonsSection
                            listToggleButtonDataList={listToggleButtonDataList}
                            setCurrentCategoryData={setCurrentCategoryData}
                            targetCategory={currentCategoryData.category}
                        />
                    ),
                    list: removeDuplicates({ list: currentCategoryData.list, key: "name" }),
                    toPageFunction: toAlbum,
                    isRenderSubInfo: true,
                    fullListData: {
                        pathname: toArtist({
                            id: artistId!,
                            additionalPath: findMatchingValueByKey<string>(
                                additionalPathsOptionsGrouped,
                                currentCategoryData.category
                            )?.value,
                        }),
                        text: fullListLinkText,
                    },
                },
                {
                    title: "Appears on",
                    list: appearsOnList,
                    toPageFunction: toAlbum,
                    fullListData: generateFullListData(artistAppearsOnParam),
                },
            ])
        );
    };

    return (
        <>
            {type ?
                renderFullList() :
                (
                    <>
                        <Table list={list} caption="Popular" />
                        {renderTilesListSections()}
                    </>
                )
            }
        </>
    );
};
