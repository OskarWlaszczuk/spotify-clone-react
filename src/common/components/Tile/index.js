import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { Picture } from "../Picture";
import { PlayPauseButton } from "../PlayPauseButton";
import { Container, SubInfo, Title } from "./styled";

export const Tile = ({ picture, title, subInfo, toPage, isArtistPictureStyle, mouseEventHandlers = {}, isActive }) => (

    <Container
        to={toPage}
        onMouseEnter={mouseEventHandlers.enter}
        onMouseLeave={mouseEventHandlers.leave}
    >
        <Picture picture={picture} $useArtistPictureStyle={isArtistPictureStyle} >
            {isActive && <PlayPauseButton isLargerAndDarkerIcon />}
        </Picture>
        <Title>{title}</Title>
        <SubInfo>{capitalizeFirstLetter(subInfo)}</SubInfo>
    </Container>
);
