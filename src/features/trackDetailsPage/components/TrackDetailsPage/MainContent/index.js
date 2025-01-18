import { Table } from "../../../../../common/components/Table"
import { fullListLinkText } from "../../../../../common/constants/fullListLinkText "
import { allReleaseParamDiscography } from "../../../../../common/constants/artistDiscographyParams"
import { toAlbum, toArtist } from "../../../../../common/functions/routes"
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList"
import { LyricsAndArtistsSection } from "../styled"
import { TrackArtistsCardsSection } from "../TrackArtistsCardsSection"
import { TrackLyricsSection } from "../TrackLyricsSection"
import { getFirstImage } from "../../../../../common/functions/getFirstImage"
import { useRenderArtistReleaseSections } from "../../../../../common/hooks/useRenderArtistReleaseSections"
import { formatAlbumSubInfo } from "../../../../../common/functions/formatAlbumSubInfo"

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
    const renderArtistsReleasesSection = useRenderArtistReleaseSections();
    console.log(secondaryArtistsAllReleasesList)
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
                        listId,
                        renderSubInfo: ({ release_date, album_type }) => formatAlbumSubInfo(release_date, album_type),
                    }])
                })
            }
            {renderArtistsReleasesSection(artistsDetailsList?.slice(1))}
        </>
    );
};