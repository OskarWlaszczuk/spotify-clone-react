import { useParams } from "react-router-dom";
import { Table } from "../../../../../common/components/Table";
import { toAlbum, toArtist } from "../../../../../common/functions/routes";
import { fullListLinkText } from "../../../../../common/constants/fullListLinkText ";
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList";
import { useRenderFullList } from "../../../../../common/functions/useRenderFullList";
import { artistAppearsOnParam } from "../../../constants/FullListPageParams";
import { useRenderDiscography } from "../../../hooks/useRenderDiscography";
import { prepareFullListPageOptions } from "../../../functions/prepareFullListPageOptions";
import { filterReleasesByGroups } from "../../../../../common/functions/filterReleasesByGroups";

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
    const renderFullList = useRenderFullList();
    const renderDiscography = useRenderDiscography(allReleasesList, listAsAlbums);

    const [appearsOnList] = filterReleasesByGroups(allReleasesList, ["appears_on"]);

    const fullListPageOptions = prepareFullListPageOptions({
        artistName: name,
        allReleasesList,
        listAsAlbums,
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
                type ?
                    renderFullList(fullListPageOptions, type) :
                    (
                        <>
                            <Table list={list} caption="Popular" />
                            {renderDiscography()}
                            {renderTilesList(sectionsToRender)}
                        </>
                    )
            }
        </>
    );
};