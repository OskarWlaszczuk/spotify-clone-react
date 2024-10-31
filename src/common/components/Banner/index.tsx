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
        <Container $useAlbumLayout={!isArtistPictureStyle}>
            <Picture $picture={picture} $useArtistPictureStyle={isArtistPictureStyle} />
            <Details>
                <Caption>{capitalizeFirstLetter(caption)}</Caption>
                <Title $larger={title?.length <= 22}>{title}</Title>
                <SubTitleContent>{subTitleContent}<MetaDatas>{metaDatas && " • "}{metaDatas}</MetaDatas></SubTitleContent>
            </Details>
        </Container>
    );
};