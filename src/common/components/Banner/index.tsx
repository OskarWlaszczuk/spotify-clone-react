import { Picture } from "../Picture";
import { Caption, Container, Details, MetaDatas, Title } from "./styled";

interface BannerProps {
    picture: string;
    metaDatas: string;
    title: string;
    caption: string;
    isArtistPictureStyle: boolean;
};

export const Banner = ({ picture, metaDatas, title, caption, isArtistPictureStyle }: BannerProps) => {

    return (
        <Container>
            <Picture $picture={picture} $useArtistPictureStyle={isArtistPictureStyle} />
            <Details>
                <Caption>{caption}</Caption>
                <Title>{title}</Title>
                <MetaDatas>{metaDatas}</MetaDatas>
            </Details>
        </Container>
    );
};