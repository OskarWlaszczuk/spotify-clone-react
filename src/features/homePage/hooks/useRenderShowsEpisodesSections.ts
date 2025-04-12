import { getFirstImage } from "../../../common/functions/getFirstImage";
import { toShow } from "../../../common/functions/routes";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { EpisodeItem } from "../../../common/Interfaces/EpisodeItem";
import { ShowItem } from "../../../common/Interfaces/ShowItem";

export const useRenderShowsEpisodesSections = (mediaSortedByCreator: (AlbumItem[] | EpisodeItem[])[], shows: ShowItem[]) => {
    const renderTilesList = useRenderTilesList();

    const renderShowsEpisodesSections = () => (
        mediaSortedByCreator?.map((showsEpisodes, index) => {
            const { name, id, publisher, images } = shows[index]

            return (
                renderTilesList([{
                    title: name,
                    list: showsEpisodes,
                    // fullListData: {
                    //     pathname: toArtist({ id, fullListType: allReleaseParamDiscography }),
                    //     text: fullListLinkText
                    // },
                    listId: index,
                    overTitleExtraContent: "Popular Episodes",
                    extraTitleImage: {
                        imageURL: getFirstImage(images),
                        isArtistImage: true,
                    },
                    subInfo: publisher,
                    titleLink: toShow({ id }),
                }])
            );
        })
    );

    return renderShowsEpisodesSections;
};