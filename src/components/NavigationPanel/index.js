import {
    NavBox,
    NavFrame,
    NavItem,
    NavPanel,
    StyledHomeIcon,
    StyledSearchIcon,
} from "./styled";
import { useNavigationToPage } from "../../useNavigationToPage";
import { toHome, toSearch } from "../../routes";

export const NavigationPanel = () => {
    const navigateToPage = useNavigationToPage();

    return (
        <NavPanel>
            <NavFrame>
                <NavBox onClick={() => navigateToPage(toHome)}>
                    <StyledHomeIcon />
                    <NavItem>Home</NavItem>
                </NavBox>
                <NavBox onClick={() => navigateToPage(toSearch)}>
                    <StyledSearchIcon />
                    <NavItem>Search</NavItem>
                </NavBox>
            </NavFrame>
            <NavFrame>
            <NavBox onClick={() => navigateToPage(toHome)}>
                    <StyledHomeIcon />
                    <NavItem>Home</NavItem>
                </NavBox>
            </NavFrame>
        </NavPanel>
    );
};