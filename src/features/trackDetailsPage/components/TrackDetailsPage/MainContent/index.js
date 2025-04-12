import { Table } from "../../../../../common/components/Table"
import { LyricsAndArtistsSection } from "../styled"
import { TrackArtistsCardsSection } from "../TrackArtistsCardsSection"
import { TrackLyricsSection } from "../TrackLyricsSection"
import { useRenderMediaSectionsSortedByCreators } from "../../../../homePage/hooks/useRenderArtistsReleasesSections"
import { useRenderMainArtistPopularListsSections } from "../../../hooks/useRenderMainArtistPopularListsSections"

export const MainContent = ({
    lyrics,
    mainArtist,
    mediaSortedByCreator,
    topTracks,
    artists,
}) => {
    const renderMediaSectionsSortedByCreators = useRenderMediaSectionsSortedByCreators();
    const renderMainArtistPopularListsSections = useRenderMainArtistPopularListsSections();

    return (
        <>
            <LyricsAndArtistsSection>
                {lyrics && <TrackLyricsSection lyrics={lyrics} />}
                <TrackArtistsCardsSection artistsDataList={artists.list} />
            </LyricsAndArtistsSection>
            <Table
                list={topTracks?.tracks}
                caption={mainArtist?.name}
            />
            {renderMainArtistPopularListsSections({ mediaSortedByCreator, topTracks, mainArtist })}
            {renderMediaSectionsSortedByCreators(mediaSortedByCreator.data?.slice(1), artists.list?.slice(1))}
        </>
    );
};