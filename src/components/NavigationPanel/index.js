import { NavPanel } from "./styled";
import { useNavigationToPage } from "../../useNavigationToPage";
import { toHome, toSearch } from "../../routes";
import { IconBox } from "../common/IconBox";
import { ReactComponent as HomeIcon } from "./icons/Home.svg";
import { ReactComponent as SearchIcon } from "./icons/Search.svg";
import { IconBoxList } from "../common/IconBoxList";

export const NavigationPanel = () => {
    const navigateToPage = useNavigationToPage();

    return (
        <NavPanel>
            <IconBoxList>
                <IconBox
                    navigateTo={() => navigateToPage(toHome)}
                    Icon={HomeIcon}
                    content="Home"
                />
                <IconBox
                    navigateTo={() => navigateToPage(toSearch)}
                    Icon={SearchIcon}
                    content="Search"
                />
            </IconBoxList>
        </NavPanel>
    );
};