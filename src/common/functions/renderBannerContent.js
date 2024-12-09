import { ArtistNameLink } from "../../features/albumPage/components/AlbumPage/styled";
import { AvatarImage } from "../components/AvatarImage";
import { getImage } from "./getImage";
import { getYear } from "./getYear";
import { toAlbum, toArtist } from "./routes";

const renderArtistAvatarImage = ({ image, name, conditionToRender = true }) => {
    return (
        <>
            {
                conditionToRender && (
                    <AvatarImage
                        $picture={image}
                        alt={name}
                        title={name}
                        $smaller
                        $useArtistPictureStyle
                    />
                )
            }
        </>
    );
};

const renderMetaDataContent = ({ releaseDate, duration, uniqueData }) => [
    getYear(releaseDate), duration, uniqueData
].join(" • ");

const renderSubTitleContent = ({
    artistsList,
    artistImage,
    mainArtistDetails,
    albumDetails
}) => {
    if (!!artistsList && artistsList.length > 0) {
        return artistsList.map(({ name, id }, index) => (
            <>
                {renderArtistAvatarImage({
                    name,
                    image: artistImage,
                    conditionToRender: artistsList?.length === 1,
                })}
                {" "}{index !== 0 && "• "}
                <ArtistNameLink to={toArtist({ id })}>{name}</ArtistNameLink>
            </>
        ));
    } else if (!!mainArtistDetails && !!albumDetails) {
        return (
            <>
                {renderArtistAvatarImage({
                    image: artistImage,
                    name: mainArtistDetails.name
                })}
                {" "}
                <ArtistNameLink to={toArtist({ id: mainArtistDetails.id })}>{mainArtistDetails.name}</ArtistNameLink>{" • "}
                <ArtistNameLink $thinner to={toAlbum({ id: albumDetails.id })}>{albumDetails.name}</ArtistNameLink>
            </>
        );
    };
};

export const renderBannerContent = ({
    metaData: {
        releaseDate,
        duration,
        uniqueData,
    },
    subTitleData: {
        artistImage,
        mainArtistDetails = null,
        albumDetails = null,
        artistsList = [],
    },
}) => {

    const metaDataContent = renderMetaDataContent({
        uniqueData,
        releaseDate,
        duration,
    });

    const subTitleContent = renderSubTitleContent({
        artistsList,
        artistImage: getImage(artistImage),
        mainArtistDetails,
        albumDetails,
    });

    return { metaDataContent, subTitleContent };
};
