import { Container, Picture, SubInfo, Title } from "./styled";

export const Tile = ({ picture, title, subInfo, useArtistLayout }) => {
    return (
        <Container>
            <Picture picture={picture} artistLayout={useArtistLayout} />
            <Title>{title}</Title>
            <SubInfo>{subInfo}</SubInfo>
        </Container>
    );
};