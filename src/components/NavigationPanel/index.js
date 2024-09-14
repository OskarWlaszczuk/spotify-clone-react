import { NavPanel } from "./styled";
import { useNavigationToPage } from "../../useNavigationToPage";
import { toHome, toSearch } from "../../routes";
import { IconBox } from "../common/IconBox";
import { ReactComponent as HomeIcon } from "./icons/Home.svg";
import { Input } from "./Input";

export const NavigationPanel = () => {
    const navigateToPage = useNavigationToPage();

    return (
        <NavPanel>
            <IconBox
                navigateTo={() => navigateToPage(toHome)}
                Icon={HomeIcon}
                noText
            />
            <Input />
        </NavPanel>
    );
};