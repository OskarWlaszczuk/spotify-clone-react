import { getAlbumArtists } from "../../../common/functions/getAlbumArtists";
import { useRenderTilesList } from "../../../common/hooks/useRenderTilesList";
import { AlbumItem } from "../../../common/Interfaces/AlbumItem";
import { ArtistsList } from "../../../common/Interfaces/ArtistsList";

export const useRenderNewReleases = (newReleases: AlbumItem[]) => {
    const renderTilesList = useRenderTilesList();

    const renderNewReleasesSection = () => {
        return (
            renderTilesList([{
                title: "New Releases",
                list: newReleases,
                // fullListData: {
                //     pathname: toArtist({ id: artistId!, fullListType: artistAppearsOnParam }),
                //     text: fullListLinkText,
                // },
                renderSubInfo: ({ artists }: ArtistsList) => getAlbumArtists(artists),
            }])
        );
    };

    return renderNewReleasesSection;
};