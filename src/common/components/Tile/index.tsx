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
    subInfo?: string;
    toPagePath: string;
    mouseEventHandlers: MouseEventHandlersMethods;
    isActive: boolean;
    isArtistPictureStyle?: boolean;
    useHorizontalLayout: boolean;
    useSubInfoAsLink?: boolean;
};

export const Tile = (
    {
        picture,
        title,
        subInfo,
        toPagePath,
        isArtistPictureStyle,
        mouseEventHandlers,
        isActive,
        useHorizontalLayout,
        useSubInfoAsLink,
    }: TileProps
) => {

    const subInfoContent = !useSubInfoAsLink && !!subInfo ? capitalizeFirstLetter(subInfo) : subInfo;

    const displayPlayButtonOnHover = (conditionToDisplay: boolean, useSmallerButton: boolean = false) => (
        conditionToDisplay && <PlayPauseButton isSmaller={useSmallerButton} />
    )

    return (
        <Container
            to={toPagePath}
            onMouseEnter={mouseEventHandlers.enter}
            onMouseLeave={mouseEventHandlers.leave}
            $useHorizontalLayout={useHorizontalLayout}
        >
            <Picture
                $picture={picture}
                $useArtistPictureStyle={isArtistPictureStyle}
                $noBorderRadius={useHorizontalLayout}
            >
                {displayPlayButtonOnHover((isActive && !useHorizontalLayout))}
            </Picture>
            <Title>{title}</Title>
            {(subInfo && !useHorizontalLayout) && <SubInfo >{subInfoContent}</SubInfo>}
            {displayPlayButtonOnHover((isActive && useHorizontalLayout), true)}
        </Container>
    );
}