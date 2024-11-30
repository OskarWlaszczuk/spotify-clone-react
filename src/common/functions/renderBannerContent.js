import { getImage } from "./getImage";
import { renderMetaDataContent } from "./renderMetaDataContent";
import { renderSubTitleContent } from "./renderSubTitleContent";

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
