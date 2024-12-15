import { ArtistNameLink } from "../../features/albumPage/components/AlbumPage/styled";
import { AvatarImage } from "../components/AvatarImage";
import { ImageURL } from "../Interfaces/ImageCollection";
import { BasicMediaData } from "../Interfaces/MediaData";
import { getFirstImage } from "./getFirstImage";
import { getYear } from "./getYear";
import { toAlbum, toArtist } from "./routes";

interface ArtistAvatarImageData {
    image: string;
    name: string;
    conditionToRender?: boolean;
};

const renderArtistAvatarImage = ({ image, name, conditionToRender = true }: ArtistAvatarImageData) => {
    return (
        <>
            {
                conditionToRender && (
                    <AvatarImage
                        $picture={image}
                        title={name}
                        $smaller
                        $useArtistPictureStyle
                    />
                )
            }
        </>
    );
};

interface MetaDataContent {
    releaseDate: string;
    duration: string;
    uniqueData: string;
};

const renderMetaDataContent = ({ releaseDate, duration, uniqueData }: MetaDataContent) => [
    getYear(releaseDate), duration, uniqueData
].join(" • ");

interface TrackDetailsPageData {
    mainArtistData: BasicMediaData;
    albumData: BasicMediaData;
};

interface AlbumDetailsPageData {
    artistsList: BasicMediaData[];
};

interface SubTitleContentData {
    albumDetailsPageData?: AlbumDetailsPageData | null;
    trackDetailsPageData?: TrackDetailsPageData | null;
    artistImagesList: ImageURL[];
};

const renderSubTitleContent = ({
    albumDetailsPageData,
    trackDetailsPageData,
    artistImagesList,
}: SubTitleContentData) => {

    const image = getFirstImage(artistImagesList);

    const renderAlbumDetailsPageContent = (albumDetailsPageData: AlbumDetailsPageData) => {
        const { artistsList } = albumDetailsPageData;

        return artistsList?.map(({ name, id }, index) => (
            <>
                {renderArtistAvatarImage({
                    name,
                    image,
                    conditionToRender: artistsList.length === 1,
                })}
                {" "}{index !== 0 && "• "}
                <ArtistNameLink to={toArtist({ id })}>{name}</ArtistNameLink>
            </>
        ));
    };

    const renderTrackDetailsPageContent = (trackDetailsPageData: TrackDetailsPageData) => {
        const { name: mainArtistName, id: mainArtistId } = trackDetailsPageData.mainArtistData;
        const { name: albumName, id: albumId } = trackDetailsPageData.albumData;

        return (
            <>
                {renderArtistAvatarImage({
                    image,
                    name: mainArtistName,
                })}
                {" "}
                <ArtistNameLink to={toArtist({ id: mainArtistId })}>{mainArtistName}</ArtistNameLink>{" • "}
                <ArtistNameLink $thinner to={toAlbum({ id: albumId })}>{albumName}</ArtistNameLink>
            </>
        );
    };


    if (albumDetailsPageData != null) return renderAlbumDetailsPageContent(albumDetailsPageData);
    if (trackDetailsPageData != null) return renderTrackDetailsPageContent(trackDetailsPageData);
};

interface BannerContentData {
    metaData: MetaDataContent;
    subTitleData: SubTitleContentData;
};

export const renderBannerContent = ({
    metaData: {
        releaseDate,
        duration,
        uniqueData,
    },
    subTitleData: {
        albumDetailsPageData = null,
        trackDetailsPageData = null,
        artistImagesList,
    }
}: BannerContentData) => {

    const metaDataContent = renderMetaDataContent({
        uniqueData,
        releaseDate,
        duration,
    });

    const subTitleContent = renderSubTitleContent({
        albumDetailsPageData,
        trackDetailsPageData,
        artistImagesList,
    });

    return { metaDataContent, subTitleContent };
};