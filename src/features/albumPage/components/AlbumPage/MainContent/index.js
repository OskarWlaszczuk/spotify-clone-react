import { Copyrights } from "./Copyrights"
import { Table } from "../../../../../common/components/Table"
import { allReleaseParamDiscography } from "../../../../../common/constants/artistDiscographyParams";
import { toAlbum, toArtist } from "../../../../../common/functions/routes";
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList";
import { getUniqueDiscNumbers } from "../../../functions/getUniqueDiscNumbers";
import { getYear } from "../../../../../common/functions/getYear";

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

    const sectionsDataToRender = [
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
            renderSubInfo: ({release_date}) => getYear(release_date),
        }
    ];

    return (
        <>
            <Table list={tracksList} useAlbumView discsNumbers={getUniqueDiscNumbers(tracksList)} />
            <Copyrights date={releaseDate} copyrights={copyrights} />
            {renderTilesList(sectionsDataToRender)}
        </>
    );
};