import { Table } from "../../../../../common/components/Table";
import { toAlbum, toArtist } from "../../../../../common/functions/routes";
import { fullListLinkText } from "../../../../../common/constants/fullListLinkText ";
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList";
import { useRenderFullList } from "../../../../../common/functions/useRenderFullList";
import { artistAppearsOnParam } from "../../../constants/FullListPageParams";
import { useRenderDiscography } from "../../../hooks/useRenderDiscography";
import { prepareFullListPageOptions } from "../../../functions/prepareFullListPageOptions";
import { filterReleasesByGroups } from "../../../../../common/functions/filterReleasesByGroups";
import { AlbumItem } from "../../../../../common/Interfaces/ListItem";

interface MainContentProps {
    artistName: string;
    artistId: string;
    artistAllReleases: AlbumItem[];
    artistTopTracks: AlbumItem[];
    artistTopTracksAsAlbums: AlbumItem[];
    fullListType: string;
};

export const MainContent = ({
    artistName,
    artistId,
    artistAllReleases,
    artistTopTracks,
    artistTopTracksAsAlbums,
    fullListType,
}: MainContentProps) => {
    
    const renderTilesList = useRenderTilesList();
    const renderFullList = useRenderFullList();
    const renderDiscography = useRenderDiscography(artistAllReleases, artistTopTracksAsAlbums);

    const [appearsOnList] = filterReleasesByGroups(artistAllReleases, ["appears_on"]);

    const fullListPageOptions = prepareFullListPageOptions({
        artistName,
        artistAllReleases,
        artistTopTracksAsAlbums,
    });

    const sectionsToRender = [
        {
            title: "Appears on",
            list: appearsOnList,
            toPageFunction: toAlbum,
            fullListData: {
                pathname: toArtist({ id: artistId!, additionalPath: artistAppearsOnParam }),
                text: fullListLinkText,
            }
        },
    ];

    return (
        <>
            {
                fullListType ?
                    renderFullList(fullListPageOptions, fullListType) :
                    (
                        <>
                            <Table list={artistTopTracks} caption="Popular" />
                            {renderDiscography()}
                            {renderTilesList(sectionsToRender)}
                        </>
                    )
            }
        </>
    );
};