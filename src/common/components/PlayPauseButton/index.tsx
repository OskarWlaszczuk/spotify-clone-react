import { Button } from "./styled"
import { StyledPlayIcon } from "../StyledPlayIcon"

interface PlayPauseButtonProps {
    isHighlighted: boolean;
};

export const PlayPauseButton = ({ isHighlighted }: PlayPauseButtonProps) => (
    <Button>
        <StyledPlayIcon $largerAndDarkerIcon={isHighlighted} />
    </Button>
);