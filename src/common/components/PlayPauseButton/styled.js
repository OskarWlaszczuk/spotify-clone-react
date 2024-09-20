import styled from "styled-components";
import { ReactComponent as PlayIcon } from "./icons/Play.svg";
import { ReactComponent as PauseIcon } from "./icons/Pause.svg";


export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: unset;
    background-color : ${({ theme }) => theme.colors.green};
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: background 0.3s;
    
    &:hover{
        background-color : ${({ theme }) => theme.colors.mantis};
       transform: scale(102%)
    }
`;

export const StyledPauseIcon = styled(PauseIcon)`

`;

export const StyledPlayIcon = styled(PlayIcon)`

`;