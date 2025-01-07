import { Button } from "./styled"
import { StyledPlayIcon } from "../StyledPlayIcon"

interface PlayPauseButtonProps {
    isSmaller?: boolean;
};

export const PlayPauseButton = ({ isSmaller }: PlayPauseButtonProps) => (
    <Button $smaller={isSmaller}>
        <StyledPlayIcon />
    </Button>
);