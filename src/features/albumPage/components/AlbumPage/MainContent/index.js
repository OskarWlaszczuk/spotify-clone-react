import { Copyrights } from "./Copyrights"
import { Table } from "../../../../../common/components/Table"
import { popularReleasesParamDiscography } from "../../../../../common/constants/artistDiscographyParams";
import { toAlbum, toArtist } from "../../../../../common/functions/routes";
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList";
import { getUniqueDiscNumbers } from "../../../functions/getUniqueDiscNumbers";
import { getYear } from "../../../../../common/functions/getYear";

export const MainContent = ({ album, mainArtist, tracks }) => {
    const renderTilesList = useRenderTilesList();

    const sectionsDataToRender = [
        {
            title: `More by ${mainArtist?.details?.name}`,
            list: mainArtist?.releases,
            toPageFunction: toAlbum,
            fullListData: {
                pathname: toArtist({
                    id: mainArtist?.details?.id,
                    additionalPath: popularReleasesParamDiscography
                }),
                text: "Show discography"
            },
            listId: 0,
            renderSubInfo: ({ release_date }) => getYear(release_date),
        }
    ];
    return (
        <>
            <Table list={tracks} useAlbumView discsNumbers={getUniqueDiscNumbers(tracks)} />
            <Copyrights date={album?.details?.release_date} copyrights={album?.details?.copyrights} />
            {renderTilesList(sectionsDataToRender)}
        </>
    );
};