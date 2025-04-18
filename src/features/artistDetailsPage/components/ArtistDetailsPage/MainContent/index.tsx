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
import { getDiscographyCategoriesData } from "../../../functions/getDiscographyCategoriesData";
interface ArtistData {
    details: ArtistItem;
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

export const MainContent = ({
    artistData,
    topTracks,
    fullListType,
}: MainContentProps) => {

    const { releases, details } = artistData;

    const popularReleases = preparePopularReleases(topTracks.albums, releases);
    const { appears_on, ...discographyReleasesGrouped } = groupReleases(releases, ["album", "compilation", "single", "appears_on"]);

    const discographyCaterogiesData = getDiscographyCategoriesData(discographyReleasesGrouped, popularReleases, details?.name);
    const appearsOnFullList = {
        releaseList: appears_on,
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
            list: appears_on,
            toPageFunction: toAlbum,
            fullListData: {
                pathname: toArtist({ id: artistData.details?.id!, fullListType: artistAppearsOnParam }),
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