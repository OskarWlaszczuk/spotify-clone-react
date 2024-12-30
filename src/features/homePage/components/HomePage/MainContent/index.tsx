import { useParams } from "react-router-dom"
import { popularAlbumsParam, popularArtistsParam } from "../../../constants/fullListPageParams";
import { useRenderFullList } from "../../../../../common/functions/useRenderFullList";
import { popularAlbumsTitle, popularArtistsTitle } from "../../../constants/popularListsTitles";
import { useRenderPopularLists } from "../../../hooks/useRenderPopularLists";
import { FullListPageOption } from "../../../../../common/Interfaces/FullListPageOption";
import { PopularListConfig } from "../../../interfaces/PopularListConfig";
import { useRenderFacet } from "../../../hooks/useRenderFacet";
import { ArtistItem } from "../../../../../common/Interfaces/ArtistItem";
import { AlbumItem } from "../../../../../common/Interfaces/AlbumItem";

interface MainContentProps {
    popularArtists: ArtistItem[];
    popularAlbums: AlbumItem[];
}

export const MainContent = ({ popularArtists, popularAlbums }: MainContentProps) => {
    const { fullListType } = useParams();

    const renderFullList = useRenderFullList()
    const renderPopularLists = useRenderPopularLists();
    const renderFacet = useRenderFacet(popularAlbums);

    const fullListPageOptions: FullListPageOption[] = [
        { key: popularAlbumsParam, value: popularAlbums, title: popularAlbumsTitle, isArtistsList: false },
        { key: popularArtistsParam, value: popularArtists, title: popularArtistsTitle, isArtistsList: true },
    ];

    const popularListsConfig: PopularListConfig[] = [
        {
            title: popularAlbumsTitle,
            list: popularAlbums,
            fullListType: popularAlbumsParam,
            isArtistsList: false,
        },
        {
            title: popularArtistsTitle,
            list: popularArtists,
            fullListType: popularArtistsParam,
            isArtistsList: true,
        },
    ];

    return (
        <>
            {
                fullListType ?
                    renderFullList(fullListPageOptions, fullListType) :
                    renderFacet()
            }

            {/* <List>
                {
                    popularAlbums?.map(({ name, images }) => (
                        <StyledHorizontalTile>
                            <Picture $picture={getFirstImage(images)} />
                            <Title>{name} </Title>
                        </StyledHorizontalTile>
                    ))
                }
            </List> */}
        </>
    )
};