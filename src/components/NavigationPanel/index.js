import { playlists } from "./playlists";
import {
    NavBox,
    NavFrame,
    NavItem,
    NavPanel,
    StyledHomeIcon,
    StyledSearchIcon,
    StyledMyLibraryIcon,
    IconContainer,
    StyledLikedIcon,
    StyledAddIcon
} from "./styled";

export const NavigationPanel = () => {
    return (
        <NavPanel>
            <NavFrame>
                <NavBox>
                    <StyledHomeIcon />
                    <NavItem>Home</NavItem>
                </NavBox>
                <NavBox>
                    <StyledSearchIcon />
                    <NavItem>Search</NavItem>
                </NavBox>
                <NavBox>
                    <StyledMyLibraryIcon />
                    <NavItem>My library</NavItem>
                </NavBox>
            </NavFrame>
            <NavFrame underlined>
                <NavBox>
                    <IconContainer
                        background="rgb(69,10,245) linear-gradient(131deg, rgba(69,10,245,1) 0%, rgba(196,239,217,1) 100%)"
                    >
                        <StyledLikedIcon />
                    </IconContainer>
                    <NavItem>Home</NavItem>
                </NavBox>
                <NavBox>
                    <IconContainer
                        background="#B3B3B3"
                    >
                        <StyledAddIcon />
                    </IconContainer>
                    <NavItem>Search</NavItem>
                </NavBox>
            </NavFrame>
            <NavFrame>
                {
                    playlists.map(playlist => (
                        <NavBox>
                            <NavItem thick>{playlist}</NavItem>
                        </NavBox>
                    ))
                }
            </NavFrame>
        </NavPanel>
    );
};