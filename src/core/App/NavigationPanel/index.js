import { NavPanel } from "./styled";
import { useNavigationToPage } from "../../../common/hooks/useNavigationToPage";
import { toHome } from "../../../common/functions/routes";
import { IconBox } from "../../../common/components/IconBox";
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