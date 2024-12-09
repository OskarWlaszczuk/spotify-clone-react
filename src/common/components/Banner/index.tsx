import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { Picture } from "../Picture";
import { Caption, Container, Details, MetaData, SubTitleContent, Title } from "./styled";

interface BannerProps {
    picture: string;
    metaData?: string;
    title: string;
    caption: string;
    useArtistPictureStyle: boolean;
    subTitleContent: any;
};

export const Banner = ({ picture, metaData, title, caption, useArtistPictureStyle, subTitleContent }: BannerProps) => {
    const isTitleLong = title?.length <= 22;

    return (
        <Container $useAlbumLayout={!useArtistPictureStyle}>
            <Picture $picture={picture} $useArtistPictureStyle={useArtistPictureStyle} />
            <Details>
                <Caption>{capitalizeFirstLetter(caption)}</Caption>
                <Title $larger={isTitleLong}>{title}</Title>
                <SubTitleContent>{subTitleContent}<MetaData>{metaData && " • "}{metaData}</MetaData></SubTitleContent>
            </Details>
        </Container>
    );
};