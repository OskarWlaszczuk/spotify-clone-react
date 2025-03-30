import { Table } from "../../../../../common/components/Table";
import { toAlbum, toArtist } from "../../../../../common/functions/routes";
import { fullListLinkText } from "../../../../../common/constants/fullListLinkText ";
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList";
import { useRenderFullList } from "../../../../../common/functions/useRenderFullList";
import { artistAppearsOnParam } from "../../../constants/FullListPageParams";
import { useRenderDiscography } from "../../../hooks/useRenderDiscography";
import { AlbumItem } from "../../../../../common/Interfaces/AlbumItem";
import { formatAlbumSubInfo } from "../../../../../common/functions/formatAlbumSubInfo";
import { ArtistItem } from "../../../../../common/Interfaces/ArtistItem";
import { FetchStatus } from "../../../../../common/Types/FetchStatus";
import { TrackItem } from "../../../../../common/Interfaces/TrackItem";
import { preparePopularReleases } from "../../../functions/preparePopularReleases";
import { groupReleases } from "../../../../../common/functions/groupReleases";
import { albumsParamDiscography, compilationParamDiscography, popularReleasesParamDiscography, singleParamDiscography } from "../../../../../common/constants/artistDiscographyParams";

interface ArtistData {
    data: ArtistItem;
    releases: AlbumItem[];
    statuses: FetchStatus[];
}

interface TopTracks {
    status: FetchStatus;
    tracks: TrackItem[];
    albums: AlbumItem[];
}
interface MainContentProps {
    artistData: ArtistData;
    topTracks: TopTracks;
    fullListType: string;
};

interface GroupedReleases {
    album: AlbumItem[];
    single: AlbumItem[];
    compilation: AlbumItem[];
}
const getDiscographyCategoriesData = (groupedReleases: GroupedReleases, popularReleases: AlbumItem[], artistName: ArtistItem["name"]) => {
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



export const MainContent = ({
    artistData,
    topTracks,
    fullListType,
}: MainContentProps) => {

    const { releases, data } = artistData;

    const appearsOn = releases.filter(({ album_group }) => album_group === "appears_on");

    const popularReleases = preparePopularReleases(topTracks.albums, releases);
    const discographyReleasesGrouped = groupReleases(releases, ["album", "compilation", "single"]);

    const discographyCaterogiesData = getDiscographyCategoriesData(discographyReleasesGrouped, popularReleases, data?.name);
    const appearsOnFullList = {
        releaseList: appearsOn,
        releaseType: artistAppearsOnParam,
        listTitle: "Appears on",
        isArtistsList: false,
    };

    const renderTilesList = useRenderTilesList();
    const renderFullList = useRenderFullList([...discographyCaterogiesData, appearsOnFullList], fullListType);
    const renderDiscography = useRenderDiscography(discographyCaterogiesData);

    const sectionsDataToRender = [
        {
            title: "Appears on",
            list: appearsOn,
            toPageFunction: toAlbum,
            fullListData: {
                pathname: toArtist({ id: artistData.data?.id!, fullListType: artistAppearsOnParam }),
                text: fullListLinkText,
            },
            renderSubInfo: ({ release_date, album_type }: { release_date: AlbumItem["release_date"], album_type: AlbumItem["album_type"] }) => formatAlbumSubInfo(release_date, album_type),
        },
    ];

    return (
        <>
            {
                fullListType ?
                    renderFullList() :
                    (
                        <>
                            <Table list={topTracks.tracks} caption="Popular" />
                            {renderDiscography()}
                            {renderTilesList(sectionsDataToRender)}
                        </>
                    )
            }
        </>
    );
};