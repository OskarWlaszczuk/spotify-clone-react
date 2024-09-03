import styled from "styled-components";
import { ReactComponent as SearchIcon } from "./icons/Search.svg";
import { ReactComponent as HomeIcon } from "./icons/Home.svg";
import { ReactComponent as MyLibraryIcon } from "./icons/MyLibrary.svg";

export const NavPanel = styled.nav`
    display: grid;
    /* display: grid;
    align-content: start;
    grid-gap: 24px;
    width: 230px;
    padding: 33px 21px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.black}; */
`;

export const NavFrame = styled.div`
    display: grid;
    align-content: start;
    grid-gap: 24px;
    width: 230px;
    padding: 33px 21px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.black};
`

export const NavBox = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 8px 0;
`;

export const NavItem = styled.a`
    color: ${({ theme }) => theme.colors.nobel};
    font-size: 13px;
    font-weight: bold;
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background: ${({ background }) => background};
    border-radius: 4px;
`;

export const StyledSearchIcon = styled(SearchIcon)`

`;

export const StyledHomeIcon = styled(HomeIcon)`

`;

export const StyledMyLibraryIcon = styled(MyLibraryIcon)`

`;
