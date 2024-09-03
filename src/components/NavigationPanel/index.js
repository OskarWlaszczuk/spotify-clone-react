import { NavPanel } from "./styled";
import { useNavigationToPage } from "../../useNavigationToPage";
import { toHome, toSearch } from "../../routes";
import { SectionContainer } from "../common/SectionContainer";
import { IconBox } from "../common/IconBox";
import { ReactComponent as HomeIcon } from "./icons/Home.svg";
import { ReactComponent as SearchIcon } from "./icons/Search.svg";

export const NavigationPanel = () => {
    const navigateToPage = useNavigationToPage();

    return (
        <SectionContainer>
            <NavPanel>
                <IconBox
                    navigateTo={() => navigateToPage(toHome)}
                    Icon={HomeIcon}
                    content="Home"
                />
                <IconBox
                    navigateTo={() => navigateToPage(toSearch)}
                    Icon={SearchIcon}
                    content="Search"
                    extraContent="+"
                />
            </NavPanel>
        </SectionContainer>
    );
};