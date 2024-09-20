import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../icons/Search.svg";

export const Container = styled.div`
    display: flex;
    flex-basis: 380px;
    align-items: center;
    padding: 10px;
    gap: 10px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.brightMineShaft};

    filter: brightness(1.3);
    cursor: pointer;
`;

export const Field = styled.input`
    width: 100%;
    border: none;
    background-color: transparent;
`;

export const StyledSearchIcon = styled(SearchIcon)`

`;