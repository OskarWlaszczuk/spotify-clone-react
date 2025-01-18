import { allReleaseParamDiscography } from "../constants/artistDiscographyParams";
import { fullListLinkText } from "../constants/fullListLinkText ";
import { getFirstImage } from "../functions/getFirstImage";
import { toAlbum, toArtist } from "../functions/routes";
import { AlbumItem } from "../Interfaces/AlbumItem";
import { ArtistItem } from "../Interfaces/ArtistItem";
import { useRenderTilesList } from "./useRenderTilesList";
import { formatAlbumSubInfo } from "../functions/formatAlbumSubInfo";

interface ArtistReleasesSectionData {
    id: string;
    name: string;
    releases: AlbumItem[];
    listId: number;
}

export const useRenderArtistReleaseSections = () => {
    const renderTilesList = useRenderTilesList();

    const renderArtistsReleasesSection = (
        artistReleasesSectionsData: ArtistReleasesSectionData[],
        artistDetailsList: ArtistItem[],
    ) => {
        // const artistNames = (
        //     artistReleasesSectionsData
        //         ?.map(({ releases }, index) => releases[0].artists.find(({ id }) => id === artistDetailsList[index].id))
        //         .filter((artist): artist is ArtistData => artist !== undefined)
        //         .map(({ name }) => name)
        // );
        return artistReleasesSectionsData?.map(({ releases, name, id, listId }, artistIndex) => {
            const { release_date, album_type } = releases[artistIndex];

            return renderTilesList([{
                title: name,
                list: releases,
                toPageFunction: toAlbum,
                fullListData: {
                    pathname: toArtist({ id, fullListType: allReleaseParamDiscography }),
                    text: fullListLinkText
                },
                listId,
                overTitleExtraContent: "Popular Releases",
                extraTitleImage: {
                    imageURL: getFirstImage(artistDetailsList?.[artistIndex].images),
                    isArtistImage: true,
                },
                subInfo: formatAlbumSubInfo(release_date, album_type),
                titleLink: toArtist({ id }),
            }])
        });
    };

    return renderArtistsReleasesSection;
};