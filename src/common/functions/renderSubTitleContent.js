import { ArtistNameLink } from "../../features/albumPage/components/AlbumPage/styled";
import { renderArtistAvatarImage } from "./renderArtistAvatarImage";
import { toAlbum, toArtist } from "./routes";

export const renderSubTitleContent = ({ artistsList, isAlbumArtistsListLengthEqualsOne, artistImage, mainArtistDetails, albumDetails }) => {
    if (artistsList && artistsList.length > 0) {
        return artistsList.map(({ name, id }, index) => (
            <>
                {renderArtistAvatarImage({
                    image: artistImage,
                    name,
                    conditionToRender: isAlbumArtistsListLengthEqualsOne
                })}
                {" "}{index !== 0 && "• "}
                <ArtistNameLink to={toArtist({ id })}>{name}</ArtistNameLink>
            </>
        ));
    } else if (mainArtistDetails) {
        return (
            <>
                {renderArtistAvatarImage({
                    image: artistImage,
                    name: mainArtistDetails.name
                })}
                {" "}
                <ArtistNameLink to={toArtist({ id: mainArtistDetails.id })}>{mainArtistDetails.name}</ArtistNameLink>{" • "}
                <ArtistNameLink $thinner to={toAlbum({ albumID: albumDetails.id })}>{albumDetails.name}</ArtistNameLink>
            </>
        );
    };
};
