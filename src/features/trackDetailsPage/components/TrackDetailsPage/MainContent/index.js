import { Table } from "../../../../../common/components/Table"
import { fullListLinkText } from "../../../../../common/constants/fullListLinkText "
import { allReleaseParamDiscography } from "../../../../../common/constants/params"
import { toAlbum, toArtist } from "../../../../../common/functions/routes"
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList"
import { LyricsAndArtistsSection } from "../styled"
import { TrackArtistsCardsSection } from "../TrackArtistsCardsSection"
import { TrackLyricsSection } from "../TrackLyricsSection"

export const MainContent = ({
    mainArtistData: {
        id,
        name,
        topTracksList,
        groupedReleasesList,
    },
    lyrics,
    artistsDetailsList,
    secondaryArtistsAllReleasesList,
}) => {
    const renderTilesList = useRenderTilesList();

    return (
        <>
            <LyricsAndArtistsSection>
                {lyrics && <TrackLyricsSection lyrics={lyrics} />}
                <TrackArtistsCardsSection artistsDataList={artistsDetailsList} />
            </LyricsAndArtistsSection>

            <Table
                list={topTracksList}
                caption={name}
            />

            {
                groupedReleasesList?.map(({ type, list, additionalPath, listId }) => {
                    return renderTilesList([{
                        title: `Popular ${type} by ${name}`,
                        list: list,
                        toPageFunction: toAlbum,
                        fullListData: {
                            pathname: toArtist({
                                id,
                                additionalPath,
                            }),
                            text: fullListLinkText,
                        },
                        listId
                    }])
                })
            }
            {
                secondaryArtistsAllReleasesList?.map(({ list, name, id, listId }) => (
                    renderTilesList([{
                        title: name,
                        list,
                        toPageFunction: toAlbum,
                        fullListData: {
                            pathname: toArtist({ id, additionalPath: allReleaseParamDiscography }),
                            text: fullListLinkText
                        },
                        listId
                    }])
                ))
            }
        </>
    );
};