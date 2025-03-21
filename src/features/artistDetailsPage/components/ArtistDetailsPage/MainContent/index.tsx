import { Table } from "../../../../../common/components/Table";
import { toAlbum, toArtist } from "../../../../../common/functions/routes";
import { fullListLinkText } from "../../../../../common/constants/fullListLinkText ";
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList";
import { useRenderFullList } from "../../../../../common/functions/useRenderFullList";
import { artistAppearsOnParam } from "../../../constants/FullListPageParams";
import { useRenderDiscography } from "../../../hooks/useRenderDiscography";
import { prepareFullListPageOptions } from "../../../functions/prepareFullListPageOptions";
import { filterReleasesByGroups } from "../../../../../common/functions/filterReleasesByGroups";
import { AlbumItem } from "../../../../../common/Interfaces/AlbumItem";
import { formatAlbumSubInfo } from "../../../../../common/functions/formatAlbumSubInfo";
import { ArtistItem } from "../../../../../common/Interfaces/ArtistItem";
import { FetchStatus } from "../../../../../common/Types/FetchStatus";
import { TrackItem } from "../../../../../common/Interfaces/TrackItem";

interface ArtistData {
    data: ArtistItem;
    releases: {
        items: AlbumItem[];
    };
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
    const releasesList = artistData.releases.items;

    const renderTilesList = useRenderTilesList();
    const renderFullList = useRenderFullList();
    const renderDiscography = useRenderDiscography(releasesList, topTracks.albums);

    const [appearsOnList] = filterReleasesByGroups(releasesList, ["appears_on"]);

    const fullListPageOptions = prepareFullListPageOptions({
        artistName: artistData.data?.name,
        artistAllReleases: releasesList,
        artistTopTracksAsAlbums: topTracks.albums,
    });

    console.log(releasesList)

    const sectionsDataToRender = [
        {
            title: "Appears on",
            list: appearsOnList,
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
                    renderFullList(fullListPageOptions, fullListType) :
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