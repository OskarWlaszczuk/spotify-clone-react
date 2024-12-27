import {useParams} from "react-router-dom"
import {popularAlbumsParam, popularArtistsParam} from "../../../constants/fullListPageParams";
import {useRenderFullList} from "../../../../../common/functions/useRenderFullList";
import {popularAlbumsTitle, popularArtistsTitle} from "../../../constants/popularListsTitles";
import {useRenderPopularLists} from "../../../hooks/useRenderPopularLists";
import {FullListPageOption} from "../../../../../common/Interfaces/FullListPageOption";
import {PopularListConfig} from "../../../interfaces/PopularListConfig";
import {AlbumItem, ArtistItem} from "../../../../../common/Interfaces/ListItem";

interface MainContentProps {
    popularArtists: ArtistItem[];
    popularAlbums: AlbumItem[];
}

export const MainContent = ({popularArtists, popularAlbums}: MainContentProps) => {
    const {type = ""} = useParams();

    const renderFullList = useRenderFullList()
    const renderPopularLists = useRenderPopularLists();

    const fullListPageOptions: FullListPageOption[] = [
        {key: popularAlbumsParam, value: popularAlbums, title: popularAlbumsTitle, isArtistsList: false},
        {key: popularArtistsParam, value: popularArtists, title: popularArtistsTitle, isArtistsList: true},
    ];

    const popularListsConfig: PopularListConfig[] = [
        {
            title: popularAlbumsTitle,
            list: popularAlbums,
            param: popularAlbumsParam,
            isArtistsList: false,
        },
        {
            title: popularArtistsTitle,
            list: popularArtists,
            param: popularArtistsParam,
            isArtistsList: true,
        },
    ];

    return (
        <>
            {
                type ?
                    renderFullList(fullListPageOptions, type) :
                    renderPopularLists(popularListsConfig)
            }
        </>
    )
};