import { Button } from "./styled"
import { StyledPlayIcon } from "../StyledPlayIcon"

export const PlayPauseButton = ({ isLargerAndDarkerIcon }) => {
    return (
        <Button>
            <StyledPlayIcon $largerAndDarkerIcon={isLargerAndDarkerIcon} />
        </Button>
    )
}