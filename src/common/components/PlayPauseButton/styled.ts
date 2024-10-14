import styled from "styled-components";
import { ReactComponent as PauseIcon } from "../../icons/Pause.svg";


export const Button = styled.button`
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
`;

export const StyledPauseIcon = styled(PauseIcon)`

`;