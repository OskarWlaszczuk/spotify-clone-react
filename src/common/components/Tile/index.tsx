import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { Picture } from "../Picture/index";
import { PlayPauseButton } from "../PlayPauseButton/index";
import { Container, SubInfo, Title } from "./styled";

interface MouseEventHandlersMethods {
    enter: () => void;
    leave: () => void;
};

interface TileProps {
    picture: string;
    title: string;
    subInfo: string;
    toPage: string;
    mouseEventHandlers: MouseEventHandlersMethods;
    isActive?: boolean;
    isArtistPictureStyle?: boolean;
};

export const Tile = (
    {
        picture,
        title,
        subInfo,
        toPage,
        isArtistPictureStyle,
        mouseEventHandlers,
        isActive
    }: TileProps
) => (
    <Container
        to={toPage}
        onMouseEnter={mouseEventHandlers.enter}
        onMouseLeave={mouseEventHandlers.leave}
    >
        <Picture $picture={picture} $useArtistPictureStyle={isArtistPictureStyle} >
            {isActive && <PlayPauseButton isLargerAndDarkerIcon />}
        </Picture>
        <Title to={toPage}>{title}</Title>
        <SubInfo>{capitalizeFirstLetter(subInfo)}</SubInfo>
    </Container>
);
