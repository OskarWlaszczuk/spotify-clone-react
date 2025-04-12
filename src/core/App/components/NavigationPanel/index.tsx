import { NavPanel } from "./styled";
import { toHome } from "../../../../common/functions/routes";
import { IconBox } from "../../../../common/components/IconBox";
import { Input } from "./Input";
import { StyledHomeIcon } from "./StyledHomeIcon";
import { facetAllCategory } from "../../../../features/homePage/constants/facetCategories";

export const NavigationPanel = () => {

    return (
        <NavPanel>
            <IconBox
                toPagePath={toHome({ fullListType: facetAllCategory })}
                Icon={StyledHomeIcon}
            />
            <Input />
        </NavPanel>
    );
};