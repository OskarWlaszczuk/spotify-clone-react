import {useParams} from "react-router-dom";
import {Table} from "../../../../../common/components/Table";
import {toAlbum, toArtist} from "../../../../../common/functions/routes";
import {useCurrentCategoryData} from "../../../hooks/useCurrentCategoryData";
import {findMatchingOptionByKey} from "../../../../../common/functions/findMatchingOptionByKey";
import {getFullListMatchedData} from "../../../../../common/functions/getFullListMatchedData";
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
import {sortFromOldestToNewest} from "../../../../../common/functions/sortFromOldestToNewest";
import {fullListLinkText} from "../../../../../common/constants/fullListLinkText ";
import {removeDuplicatesByName} from "../../../../../common/functions/removeDuplicatesByName";
import {CategoriesSwitchersSection} from "../../../../../common/components/CategoriesSwitchersSection";
import {useRenderTilesList} from "../../../../../common/hooks/useRenderTilesList";
import {prepareReleases} from "../../../functions/prepareReleases";
import {preparePopularReleases} from "../../../functions/preparePopularReleases";
import {useRenderFullList} from "../../../../../common/functions/useRenderFullList";
import {artistAppearsOnParam} from "../../../constants/FullListPageParams";

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

    const {id: artistId, type = ""} = useParams();
    const renderTilesList = useRenderTilesList();

    const {
        albumsList,
        compilationsList,
        singlesList,
        appearsOnList,
        allReleasesWithoutAppearsOn,
    } = prepareReleases(allReleasesList);

    const uniquePopularReleases = preparePopularReleases(listAsAlbums, allReleasesWithoutAppearsOn);

    const {currentCategoryData, setCurrentCategoryData} = useCurrentCategoryData({
        key: popularReleasesCategory,
        value: uniquePopularReleases,
    });

    const baseDiscographyData = {
        title: name,
        isArtistsList: false,
    };
    console.log(uniquePopularReleases)
    const fullListPageOptions = [
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

    const renderTilesListSections = () => {
        const generateFullListData = (additionalPath: any) => ({
            pathname: toArtist({id: artistId!, additionalPath}),
            text: fullListLinkText,
        });

        const listToggleButtonDataList = [
            {
                listToDisplay: uniquePopularReleases,
                category: popularReleasesCategory,
                categorySwitcherContent: "Popular releases"
            },
            {
                listToDisplay: albumsList,
                category: albumsCategory,
                categorySwitcherContent: "Albums"
            },
            {
                listToDisplay: singlesList,
                category: singlesCategory,
                categorySwitcherContent: "Singles and EPs"
            },
            {
                listToDisplay: compilationsList,
                category: compilationsCategory,
                categorySwitcherContent: "Compilations"
            },
        ];

        const additionalPathsOptionsGrouped = [
            {key: popularReleasesCategory, value: allReleaseParamDiscography},
            {key: albumsCategory, value: albumsParamDiscography},
            {key: compilationsCategory, value: compilationParamDiscography},
            {key: singlesCategory, value: singleParamDiscography},
        ];

        return (
            renderTilesList([
                {
                    title: "Discography",
                    subExtraContent: (
                        <CategoriesSwitchersSection
                            categoriesDataList={listToggleButtonDataList}
                            setCurrentCategoryData={setCurrentCategoryData}
                            targetCategory={currentCategoryData.category}
                        />
                    ),
                    list: removeDuplicatesByName(currentCategoryData.listToDisplay),
                    toPageFunction: toAlbum,
                    isRenderSubInfo: true,
                    fullListData: {
                        pathname: toArtist({
                            id: artistId!,
                            additionalPath: findMatchingOptionByKey(
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
                renderFullList(fullListPageOptions, type) :
                (
                    <>
                        <Table list={list} caption="Popular"/>
                        {renderTilesListSections()}
                    </>
                )
            }
        </>
    );
};