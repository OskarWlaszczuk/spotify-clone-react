import { Copyrights } from "../../../../../common/components/Copyrights"
import { Table } from "../../../../../common/components/Table"
import { allReleaseParamDiscography } from "../../../../../common/constants/params";
import { toAlbum, toArtist } from "../../../../../common/functions/routes";
import { useRenderTilesList } from "../../../../../common/functions/useRenderTilesList";
import { getUniqueDiscNumbers } from "../../../functions/getUniqueDiscNumbers";

export const MainContent = ({
    mainArtistData: {
        id,
        name,
        releases,
    },
    albumData: {
        releaseDate,
        copyrights,
    },
    tracksList,
}) => {
    const renderTilesList = useRenderTilesList();

    return (
        <>
            <Table list={tracksList} useAlbumView discsNumbers={getUniqueDiscNumbers(tracksList)} />
            <Copyrights date={releaseDate} copyrights={copyrights} />
            {
                renderTilesList([
                    {
                        title: `More by ${name}`,
                        list: releases,
                        toPageFunction: toAlbum,
                        fullListData: {
                            pathname: toArtist({
                                id,
                                additionalPath: allReleaseParamDiscography
                            }),
                            text: "Show discography"
                        },
                        listId: 0,
                    }
                ])
            }
        </>
    )
}