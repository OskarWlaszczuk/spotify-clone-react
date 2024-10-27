import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { Picture } from "../Picture";
import { Caption, Container, Details, MetaDatas, SubTitleContent, Title } from "./styled";

interface BannerProps {
    picture: string;
    metaDatas?: string;
    title: string;
    caption: string;
    isArtistPictureStyle: boolean;
    subTitleContent: any;
};

export const Banner = ({ picture, metaDatas, title, caption, isArtistPictureStyle, subTitleContent }: BannerProps) => {
    return (
        <Container>
            <Picture $picture={picture} $useArtistPictureStyle={isArtistPictureStyle} />
            <Details>
                <Caption>{capitalizeFirstLetter(caption)}</Caption>
                <Title>{title}</Title>
                <SubTitleContent>{subTitleContent}<MetaDatas>{metaDatas && " • "}{metaDatas}</MetaDatas></SubTitleContent>
            </Details>
        </Container>
    );
};