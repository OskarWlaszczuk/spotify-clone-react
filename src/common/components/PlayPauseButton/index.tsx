import { Button } from "./styled"
import { StyledPlayIcon } from "../StyledPlayIcon"

interface PlayPauseButtonProps {
    isLargerAndDarkerIcon: boolean;
}

export const PlayPauseButton = ({ isLargerAndDarkerIcon }: PlayPauseButtonProps) => {
    return (
        <Button>
            <StyledPlayIcon $largerAndDarkerIcon={isLargerAndDarkerIcon} />
        </Button>
    )
}