import styled, { css } from "styled-components";
import { ReactComponent as SearchIcon } from "./icons/Search.svg";
import { ReactComponent as HomeIcon } from "./icons/Home.svg";
import { ReactComponent as MyLibraryIcon } from "./icons/MyLibrary.svg";
import { ReactComponent as LikedIcon } from "./icons/Liked.svg";
import { ReactComponent as AddIcon } from "./icons/Add.svg";

export const NavPanel = styled.nav`
    display: grid;
    align-content: start;
    grid-gap: 24px;
    width: 230px;
    padding: 33px 21px;
    background-color: ${({ theme }) => theme.colors.codGray};
`;

export const NavFrame = styled.ul`
    margin: 0;
    padding-left: 0;
    list-style-type: none;

    ${({ underlined }) => underlined && css`
        border-bottom: 2px solid ${({ theme }) => theme.colors.mineShaft};
    `};
`;

export const NavBox = styled.li`
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 8px 0;
`;

export const NavItem = styled.a`
    color: ${({ theme }) => theme.colors.nobel};
    font-size: 13px;
    font-weight: bold;

    ${({ thick }) => thick && css`
      font-weight: normal;
    `};
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

export const StyledAddIcon = styled(AddIcon)`

`;

export const StyledLikedIcon = styled(LikedIcon)`

`;

export const StyledSearchIcon = styled(SearchIcon)`

`;

export const StyledHomeIcon = styled(HomeIcon)`

`;

export const StyledMyLibraryIcon = styled(MyLibraryIcon)`

`;
