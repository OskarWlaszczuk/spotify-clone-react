import styled, { css } from "styled-components";
import { ReactComponent as PauseIcon } from "../../icons/Pause.svg";

interface ButtonProps {
    $smaller?: boolean;
}

export const Button = styled.button<ButtonProps>`
    justify-self: end;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: unset;
    background-color : ${({ theme }) => theme.colors.green};
    width: 50px;
    height: 50px;
    position: absolute;
    
    &:hover{
        background-color : ${({ theme }) => theme.colors.mantis};
        cursor: pointer;
    }

    ${({ $smaller}) =>  $smaller && css`
        width: 35px;
        height: 35px;
    `};
`;

export const StyledPauseIcon = styled(PauseIcon)`

`;