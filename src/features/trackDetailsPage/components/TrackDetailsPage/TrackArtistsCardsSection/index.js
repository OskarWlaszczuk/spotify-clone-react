import { ArtistCard, ArtistsCardSection, ArtistCardMetaData, ArtistCardLink, ArtistCardMetaDataContainer } from "./styled"
import { Picture } from "../../../../../common/components/Picture"
import { capitalizeFirstLetter } from "../../../../../common/functions/capitalizeFirstLetter"
import { getFirstImage } from "../../../../../common/functions/getFirstImage"
import { toArtist } from "../../../../../common/functions/routes"

export const TrackArtistsCardsSection = ({ artistsDataList }) => {
    return (
        <ArtistsCardSection>
            {
                artistsDataList?.map(({ id, name, type, images }) => (
                    <ArtistCardLink to={toArtist({ id })}>
                        <ArtistCard>
                            <Picture $picture={getFirstImage(images)} $useArtistPictureStyle />
                            <ArtistCardMetaDataContainer>
                                <ArtistCardMetaData>{capitalizeFirstLetter(type)}</ArtistCardMetaData>
                                <ArtistCardMetaData $specialOnHover>{name}</ArtistCardMetaData>
                            </ArtistCardMetaDataContainer>
                        </ArtistCard>
                    </ArtistCardLink>
                ))
            }
        </ArtistsCardSection>
    )
};