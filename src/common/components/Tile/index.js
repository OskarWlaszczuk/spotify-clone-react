import { Container, Picture, SubInfo, Title } from "./styled";

export const Tile = ({ picture, title, subInfo, id, navigateTo, useArtistPictureStyle }) => {
    return (
            <Container id={id} onClick={navigateTo}>
                <Picture picture={picture} artistPictureStyle={useArtistPictureStyle} />
                <Title>{title}</Title>
                <SubInfo>{subInfo.slice(0, 1).toUpperCase() + subInfo.slice(1)}</SubInfo>
            </Container>
    );
};