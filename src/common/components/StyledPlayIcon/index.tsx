import styled, { css } from "styled-components";
import { ReactComponent as PlayIcon } from "../../icons/Play.svg";

interface StyledPlayIconProps {
    $largerAndDarkerIcon?: boolean;
}

export const StyledPlayIcon = styled(PlayIcon) <StyledPlayIconProps>`
    width: 13px; 
    height: 13px; 
    fill: white; 

    ${({ $largerAndDarkerIcon }) => $largerAndDarkerIcon && css`
        fill: black;
        width: 17px; 
        height: 17px; 
    `};
`;