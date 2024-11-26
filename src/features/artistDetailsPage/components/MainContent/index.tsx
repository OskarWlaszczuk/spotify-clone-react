import { useParams } from "react-router-dom";
import { Table } from "../../../../common/components/Table";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { useCurrentCategoryData } from "../../hooks/useCurrentCategoryData";
import { findMatchingValueByKey } from "../../../../common/functions/findMatchingValueByKey";
import { matchFullListDataByType } from "../../../../common/functions/matchFullListDataByType";
import {
    albumsCategory,
    compilationsCategory,
    popularReleasesCategory,
    singlesCategory
} from "../../constants/categories";
import {
    allReleaseDiscography,
    relatedArtistsParam,
    albumsParamDiscography,
    singleParamDiscography,
    artistAppearsOnParam,
    compilationParamDiscography
} from "../../../../common/constants/params";
import { sortFromOldestToNewest } from "../../../../common/functions/sortFromOldestToNewest";
import { fullListLinkText } from "../../../../common/constants/fullListLinkText ";
import { removeDuplicates } from "../../../../common/functions/removeDuplicates";
import { ListToggleButtonsSection } from "../../../../common/components/ListToggleButtonsSection";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";
import { prepareReleases } from "../../functions/prepareReleases";
import { preparePopularReleases } from "../../functions/preparePopularReleases";

interface TopTrackData {
    topTracksList: any;
    topTracksAlbumsList: any;
};

interface MainContentProps {
    artistName: string;
    artistAllReleas: any;
    artistRelatedArtists: any;
    artistTopTrackData: TopTrackData;
};


export const MainContent = ({
    artistName,
    artistTopTrackData: { topTracksList, topTracksAlbumsList },
    artistAllReleas,
    artistRelatedArtists,
}: MainContentProps) => {
    const { id: artistId, type = "" } = useParams<{ id: string; type?: string }>();
    const renderTilesList = useRenderTilesList();

    const {
        albumsList,
        compilationsList,
        singlesList,
        appearsOnList,
        allReleasesWithoutAppearsOn,
    } = prepareReleases(artistAllReleas);

    const uniquePopularReleases = preparePopularReleases(topTracksAlbumsList, allReleasesWithoutAppearsOn);

    const { currentCategoryData, setCurrentCategoryData } = useCurrentCategoryData({
        key: popularReleasesCategory,
        value: uniquePopularReleases,
    });

    const { fullListContent, fullListTitle, isFullListArtistsList } = matchFullListDataByType(
        [
            { key: allReleaseDiscography, value: sortFromOldestToNewest(uniquePopularReleases) },
            { key: albumsParamDiscography, value: albumsList },
            { key: compilationParamDiscography, value: compilationsList },
            { key: singleParamDiscography, value: singlesList },
            { key: relatedArtistsParam, value: artistRelatedArtists, title: "Fans also like", isArtistsList: true },
            { key: artistAppearsOnParam, value: appearsOnList, title: "Appears On", isArtistsList: false },
        ],
        type
    );

    const renderFullList = () =>
        renderTilesList([
            {
                title: fullListTitle || artistName,
                list: removeDuplicates(fullListContent, "name"),
                toPageFunction: isFullListArtistsList ? toArtist : toAlbum,
                isArtistsList: isFullListArtistsList || false,
                isHideRestListPart: false,
                isRenderSubInfo: true,
            },
        ]);

    const prepareTilesListSections = () =>
        renderTilesList([
            {
                title: "Discography",
                subExtraContent: (
                    <ListToggleButtonsSection
                        listToggleButtonDatasList={[
                            { list: uniquePopularReleases, category: popularReleasesCategory, text: "Popular releases" },
                            { list: albumsList, category: albumsCategory, text: "Albums" },
                            { list: singlesList, category: singlesCategory, text: "Singles and EPs" },
                            { list: compilationsList, category: compilationsCategory, text: "Compilations" },
                        ]}
                        setCurrentCategoryData={setCurrentCategoryData}
                        targetCategory={currentCategoryData.category}
                    />
                ),
                list: removeDuplicates(currentCategoryData.list, "name"),
                toPageFunction: toAlbum,
                isRenderSubInfo: true,
                fullListData: {
                    pathname: toArtist({
                        id: artistId!,
                        additionalPath: findMatchingValueByKey<string>(
                            [
                                { key: popularReleasesCategory, value: allReleaseDiscography },
                                { key: albumsCategory, value: albumsParamDiscography },
                                { key: compilationsCategory, value: compilationParamDiscography },
                                { key: singlesCategory, value: singleParamDiscography },
                            ],
                            currentCategoryData.category
                        )?.value,
                    }),
                    text: fullListLinkText,
                },
            },
            {
                title: "Fans also like",
                list: artistRelatedArtists,
                toPageFunction: toArtist,
                fullListData: {
                    pathname: toArtist({ id: artistId!, additionalPath: relatedArtistsParam }),
                    text: fullListLinkText,
                },
                isArtistsList: true,
            },
            {
                title: "Appears on",
                list: appearsOnList,
                toPageFunction: toAlbum,
                fullListData: {
                    pathname: toArtist({
                        id: artistId!,
                        additionalPath: artistAppearsOnParam,
                    }),
                    text: fullListLinkText,
                },
            },
        ]);

    return (
        <>
            {type ? renderFullList() : (
                <>
                    <Table list={topTracksList} caption="Popular" />
                    {prepareTilesListSections()}
                </>
            )}
        </>
    );
};
