import { useParams } from "react-router-dom"
import { popularAlbumsParam, popularArtistsParam, popularPodcastsParam } from "../../../constants/fullListPageParams";
import { useRenderFullList } from "../../../../../common/functions/useRenderFullList";
import { popularAlbumsTitle, popularArtistsTitle, popularEpisodesTitle } from "../../../constants/popularListsTitles";
import { useRenderPopularLists } from "../../../hooks/useRenderPopularLists";
import { FullListPageOption } from "../../../../../common/Interfaces/FullListPageOption";
import { PopularListConfig } from "../../../interfaces/PopularListConfig";
import { useRenderFacet } from "../../../hooks/useRenderFacet";
import { ArtistItem } from "../../../../../common/Interfaces/ArtistItem";
import { AlbumItem } from "../../../../../common/Interfaces/AlbumItem";
import { EpisodeItem } from "../../../../../common/Interfaces/EpisodeItem";
import { useRenderArtistReleaseSections } from "../../../../../common/hooks/useRenderArtistReleaseSections";
import { allFacetParam, FacetParam, musicFacetParam, podcastsFacetParam } from "../../../constants/facetParams";
import { useState } from "react";
import { CategoryConfig } from "../../../../../common/components/CategoriesSwitchersSection/CategoryConfig";
import { useFetchShows } from "../../../../../common/hooks/useFetchShows";
import { popularEpisodesIdsList, popularShowsIdsList } from "../../../constants/popularListsIds";
import { ShowItem } from "../../../../../common/Interfaces/ShowItem";
import { useRenderTilesList } from "../../../../../common/hooks/useRenderTilesList";
import { toAlbum, toArtist } from "../../../../../common/functions/routes";
import { useFetchEpisodes } from "../../../../../common/hooks/useFetchEpisodes";
import { useArtistsAlbumsList2 } from "../../../../trackDetailsPage/hooks/useArtistsAlbumsList";
import { getFirstImage } from "../../../../../common/functions/getFirstImage";

interface ArtistAllReleasesData {
    id: string;
    name: string;
    releases: AlbumItem[];
    listId: number;
}

type PopularLists = [AlbumItem[], ArtistItem[], EpisodeItem[]]

interface MainContentProps {
    popularLists: PopularLists
    artistsAllReleasesDataList: ArtistAllReleasesData[];
}

export const MainContent = ({
    popularLists,
    artistsAllReleasesDataList,
}: MainContentProps) => {

    const { showsDetailsList, showDetailsStatus } = useFetchShows({
        showsIdsList: popularShowsIdsList,
        pageId: "home",
    });

    const { episodesGroupedByShows, episodesGroupedByShowsStatus } = useArtistsAlbumsList2({ showsDetailsList });
    // console.log(episodesGroupedByShows, episodesGroupedByShowsStatus);

    // console.log(showsDetailsList)
    // console.log(showsDetailsList)

    // const{ episodesDetailsList, episodesDetailsStatus } = useFetchEpisodes({
    //     episodeIdsList: popularEpisodesIdsList,
    //     pageId: "home",
    // });
    // console.log(episodesDetailsList)
    const [popularAlbums, popularArtists, popularEpisodes] = popularLists;

    const { fullListType, facetType } = useParams();
console.log(popularEpisodes)
    const renderFullList = useRenderFullList()
    const renderPopularLists = useRenderPopularLists();
    const renderFacet = useRenderFacet(popularAlbums, popularEpisodes);
    const renderArtistsReleasesSection = useRenderArtistReleaseSections();
    const renderTilesList = useRenderTilesList();

    const fullListPageOptions: FullListPageOption[] = [
        { key: popularAlbumsParam, value: popularAlbums, title: popularAlbumsTitle, isArtistsList: false },
        { key: popularArtistsParam, value: popularArtists, title: popularArtistsTitle, isArtistsList: true },
    ];

    // const popularListsConfig: PopularListConfig[] = [
    //     {
    //         title: popularAlbumsTitle,
    //         list: popularAlbums,
    //         fullListType: popularAlbumsParam,
    //         isArtistsList: false,
    //     },
    //     {
    //         title: popularArtistsTitle,
    //         list: popularArtists,
    //         fullListType: popularArtistsParam,
    //         isArtistsList: true,
    //     },
    // ];

    // export const musicFacetParam = "facet=music";
    // export const podcastsFacetParam = "facet=podcasts";
    // export const allFacetParam = "facet=all";

    const createPopularListConfig = ({ title, list, fullListType, isArtistsList }: PopularListConfig) => ([{
        title,
        list,
        fullListType,
        isArtistsList
    }]);

    // const allFacetView = createPopularListConfig({
    //     title: popularArtistsTitle,
    //     list: [...popularEpisodes, ...popularAlbums],
    //     fullListType: popularPodcastsParam,
    //     isArtistsList: false,
    // });

    // const musicFacetView = createPopularListConfig({
    //     title: popularAlbumsTitle,
    //     list: popularAlbums,
    //     fullListType: popularAlbumsParam,
    //     isArtistsList: false,
    // });

    // const podcastsFacetView = createPopularListConfig({
    //     title: popularEpisodesTitle,
    //     list: popularEpisodes,
    //     fullListType: popularPodcastsParam,
    //     isArtistsList: false,
    // });

    // const useSelectViewBasedOnFacetParam = (currentFacetParam: FacetParam):PopularListConfig => {

    //     // const [viewToDisplay, ] = useState(allFacetView)

    //     switch (currentFacetParam) {
    //         case musicFacetParam:
    //             return musicFacetView

    //         case podcastsFacetParam:
    //             return podcastsFacetView

    //         default:
    //             return allFacetView
    //     }

    // }

    // const viewToDisplay = useSelectViewBasedOnFacetParam(musicFacetParam)
    // console.log(viewToDisplay)
    // const findMatchingPopularListConfigByFacet = (currentFacetName: any) => {
    //     const array = [
    //         {
    //             key: facetMusicCategory,

    //         }
    //     ]
    // }

    const renderPopularShowsSection = (showsDetailsList: ShowItem[]) => {
        renderTilesList({

        })
        //     showsDetailsList?.map(({ name, id, publisher, images }) => (

        // ))
    }

    // const artistNames = artistsAllReleasesDataList
    //     ?.map(({ releases }, index) => releases[0]?.artists.find(({ id }) => id === popularArtists[index]?.id))
    //     .filter((artist): artist is ArtistData => artist !== undefined)
    //     .map(({ name }) => name);

    const podcastsSectionsDataToRender = [
        {
            title: "Shows you might like",
            list: showsDetailsList,
            toPageFunction: toAlbum,
            // fullListData: {
            //     pathname: toArtist({
            //         id,
            //         additionalPath: allReleaseParamDiscography
            //     }),
            //     text: "Show discography"
            // },
            listId: 0,
            renderSubInfo: ({ publisher }) => publisher,
        }
    ];


    return (
        <>
            {
                fullListType ?
                    renderFullList(fullListPageOptions, fullListType) :
                    (
                        <>
                            {renderFacet()}
                            {/* {renderPopularLists(viewToDisplay)} */}
                            {renderTilesList(podcastsSectionsDataToRender)}
                            {renderArtistsReleasesSection(artistsAllReleasesDataList, popularArtists)}
                            {/* {renderPopularLists(popularListsConfig)} */}
                            {
                                episodesGroupedByShows?.map(({ releases, name, id, listId }, episodeIndex) => {
                                    // const { publisher } = showsDetailsList?.[episodeIndex].publisher;

                                    return renderTilesList([{
                                        title: name,
                                        list: releases,
                                        toPageFunction: toAlbum,
                                        // fullListData: {
                                        //     pathname: toArtist({ id, fullListType: allReleaseParamDiscography }),
                                        //     text: fullListLinkText
                                        // },
                                        listId,
                                        overTitleExtraContent: "Popular Releases",
                                        extraTitleImage: {
                                            imageURL: getFirstImage(showsDetailsList?.[episodeIndex].images),
                                            isArtistImage: false,
                                        },
                                        subInfo: showsDetailsList?.[episodeIndex].publisher,
                                        // titleLink: toArtist({ id }),
                                    }])
                                })
                            }

                        </>
                    )

            }
        </>
    )
};