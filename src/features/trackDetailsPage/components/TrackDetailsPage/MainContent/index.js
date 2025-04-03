import { Table } from "../../../../../common/components/Table"
import { fullListLinkText } from "../../../../../common/constants/fullListLinkText "
import { albumsParamDiscography, popularReleasesParamDiscography, singleParamDiscography } from "../../../../../common/constants/artistDiscographyParams"
import { toAlbum, toArtist } from "../../../../../common/functions/routes"
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList"
import { LyricsAndArtistsSection } from "../styled"
import { TrackArtistsCardsSection } from "../TrackArtistsCardsSection"
import { TrackLyricsSection } from "../TrackLyricsSection"
import { formatAlbumSubInfo } from "../../../../../common/functions/formatAlbumSubInfo"
import { groupReleases } from "../../../../../common/functions/groupReleases"
import { preparePopularReleases } from "../../../../artistDetailsPage/functions/preparePopularReleases"
import { useRenderMediaSectionsSortedByCreators } from "../../../../homePage/hooks/useRenderArtistsReleasesSections"

export const MainContent = ({
    lyrics,
    mainArtist,
    mediaSortedByCreator,
    topTracks,
    artists,
}) => {
    const renderTilesList = useRenderTilesList();
    const renderMediaSectionsSortedByCreators = useRenderMediaSectionsSortedByCreators();

    const mainArtistReleases = mediaSortedByCreator.data?.[0];
    const { album, single } = groupReleases(mainArtistReleases, ["album", "single"]);
    const popularReleases = preparePopularReleases(topTracks.albums, mainArtistReleases);

    const myConst = [
        {
            list: popularReleases,
            listType: "Releases",
            fullListType: popularReleasesParamDiscography,
        },
        {
            list: album,
            listType: "Albums",
            fullListType: albumsParamDiscography,
        },
        {
            list: single,
            listType: "Singles and EPs",
            fullListType: singleParamDiscography,
        },
    ];

    return (
        <>
            <LyricsAndArtistsSection>
                {lyrics && <TrackLyricsSection lyrics={lyrics} />}
                <TrackArtistsCardsSection artistsDataList={artists.list} />
            </LyricsAndArtistsSection>

            <Table
                list={topTracks.tracks}
                caption={mainArtist.name}
            />
            {
                myConst?.map(({ list, listType, fullListType }, index) => (
                    renderTilesList([{
                        title: `Popular ${listType} by ${mainArtist.name}`,
                        list,
                        toPageFunction: toAlbum,
                        fullListData: {
                            pathname: toArtist({
                                id: mainArtist.id,
                                fullListType,
                            }),
                            text: fullListLinkText,
                        },
                        listId: index,
                        renderSubInfo: ({ release_date, album_type }) => formatAlbumSubInfo(release_date, album_type),
                    }])
                ))
            }
            {
                renderMediaSectionsSortedByCreators(mediaSortedByCreator.data?.slice(1), artists.list?.slice(1))
            }
        </>
    );
};