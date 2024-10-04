import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { Picture } from "../Picture";
import { Container, SubInfo, Title } from "./styled";

export const Tile = ({ picture, title, subInfo, toPage, isArtistPictureStyle }) => (

    <Container to={toPage}>
        <Picture picture={picture} $useArtistPictureStyle={isArtistPictureStyle} />
        <Title>{title}</Title>
        <SubInfo>{capitalizeFirstLetter(subInfo)}</SubInfo>
    </Container>
);
