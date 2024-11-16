import { AvatarImage } from "../components/AvatarImage"

export const renderArtistAvatarImage = ({ image, name, conditionToRender = true }) => {
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