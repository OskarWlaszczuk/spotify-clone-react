import { popularReleasesParamDiscography } from "../../../common/constants/artistDiscographyParams";
import { fullListLinkText } from "../../../common/constants/fullListLinkText ";
import { getAlbumArtists } from "../../../common/functions/getAlbumArtists";
import { getFirstImage } from "../../../common/functions/getFirstImage";
import { toArtist } from "../../../common/functions/routes";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { ArtistItem } from "../../../common/Interfaces/ArtistItem";
import { EpisodeItem } from "../../../common/Interfaces/EpisodeItem";
import { ShowItem } from "../../../common/Interfaces/ShowItem";

export const useRenderMediaSectionsSortedByCreators = () => {

    const renderTilesList = useRenderTilesList();

    const renderMediaSectionsSortedByCreators = (mediaSortedByCreator: (AlbumItem[] | EpisodeItem[])[], creatorsDetails: ArtistItem[] | ShowItem[]) => (
        mediaSortedByCreator?.map((creatorMedia, index) => {

            const baseCreatorData = {
                id: creatorsDetails?.[index]?.id,
                type: creatorsDetails?.[index]?.type,
                name: creatorsDetails?.[index]?.name,
                images: creatorsDetails?.[index]?.images,
            };

            const showData = {
                ...baseCreatorData,
                publisher: creatorsDetails?.[index]?.publisher,
            };

            const artistData = {
                ...baseCreatorData,
                artists: creatorMedia?.[0]?.artists,
            };

            const isArtistCreator = baseCreatorData.type === "artist";
            const subInfo = isArtistCreator ? getAlbumArtists(artistData.artists) : showData.publisher;

            return (
                renderTilesList([{
                    title: baseCreatorData.name,
                    list: creatorMedia,
                    fullListData: {
                        pathname: toArtist({ id: baseCreatorData.id, fullListType: popularReleasesParamDiscography }),
                        text: fullListLinkText
                    },
                    listId: index,
                    overTitleExtraContent: ` Popular ${isArtistCreator ? "Releases" : "Episodes"}`,
                    extraTitleImage: {
                        imageURL: getFirstImage(baseCreatorData.images),
                        isArtistImage: isArtistCreator ? true : false,
                    },
                    subInfo,
                    titleLink: toArtist({ id: baseCreatorData.id }),
                }])
            );
        })
    );

    return renderMediaSectionsSortedByCreators;
};