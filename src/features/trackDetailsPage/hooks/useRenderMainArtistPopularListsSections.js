import { albumsParamDiscography, popularReleasesParamDiscography, singleParamDiscography } from "../../../common/constants/artistDiscographyParams";
import { fullListLinkText } from "../../../common/constants/fullListLinkText ";
import { formatAlbumSubInfo } from "../../../common/functions/formatAlbumSubInfo";
import { groupReleases } from "../../../common/functions/groupReleases";
import { toAlbum, toArtist } from "../../../common/functions/routes";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import { preparePopularReleases } from "../../artistDetailsPage/functions/preparePopularReleases";

export const useRenderMainArtistPopularListsSections = () => {
    const renderTilesList = useRenderTilesList();

    const renderMainArtistPopularListsSections = ({ mediaSortedByCreator, topTracks, mainArtist }) => {
        const mainArtistReleases = mediaSortedByCreator.data?.[0];
        const { album, single } = groupReleases(mainArtistReleases, ["album", "single"]);
        const popularReleases = preparePopularReleases(topTracks.albums, mainArtistReleases);

        const mainArtistPopularReleasesGrouped = [
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
                {
                    mainArtistPopularReleasesGrouped?.map(({ list, listType, fullListType }, index) => (
                        renderTilesList([{
                            title: `Popular ${listType} by ${mainArtist?.name}`,
                            list,
                            toPageFunction: toAlbum,
                            fullListData: {
                                pathname: toArtist({
                                    id: mainArtist?.id,
                                    fullListType,
                                }),
                                text: fullListLinkText,
                            },
                            listId: index,
                            renderSubInfo: ({ release_date, album_type }) => formatAlbumSubInfo(release_date, album_type),
                        }])
                    ))
                }
            </>
        );
    };

    return renderMainArtistPopularListsSections;
};