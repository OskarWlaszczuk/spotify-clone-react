import { Picture } from "../Picture";
import { Caption, Container, Details, MetaDatas, Title } from "./styled";

export const Banner = ({ picture, metaDatas, title, caption, isArtistPictureStyle }) => {

    return (
        <Container>
            <Picture picture={picture} $useArtistPictureStyle={isArtistPictureStyle} />
            <Details>
                <Caption>{caption}</Caption>
                <Title>{title}</Title>
                <MetaDatas>{metaDatas}</MetaDatas>
            </Details>
        </Container>
    );
};