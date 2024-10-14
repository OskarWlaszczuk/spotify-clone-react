import { NavPanel } from "./styled";
import { toHome } from "../../../../common/functions/routes";
import { IconBox } from "../../../../common/components/IconBox";
import { Input } from "./Input";
import { StyledHomeIcon } from "./StyledHomeIcon";

export const NavigationPanel = () => {

    return (
        <NavPanel>
            <IconBox
                toPage={toHome()}
                Icon={StyledHomeIcon}
            />
            <Input />
        </NavPanel>
    );
};