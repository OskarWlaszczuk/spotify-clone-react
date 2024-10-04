import { NavPanel } from "./styled";
import { toHome } from "../../../common/functions/routes";
import { IconBox } from "../../../common/components/IconBox";
import { ReactComponent as HomeIcon } from "./icons/Home.svg";
import { Input } from "./Input";

export const NavigationPanel = () => {

    return (
        <NavPanel>
            <IconBox
                toPage={toHome()}
                Icon={HomeIcon}
            />
            <Input />
        </NavPanel>
    );
};