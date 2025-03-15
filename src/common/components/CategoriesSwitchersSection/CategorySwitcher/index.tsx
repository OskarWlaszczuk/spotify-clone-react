import { Switcher, SwitcherAsLink } from "./styled";

interface CategorySwitcherProps {
    switchCategoryFunction: () => void;
    switcherContent: string;
    isActive: boolean;
    isListNotEmpty: boolean;
    pathname?: string;
};

export const CategorySwitcher = (
    { switchCategoryFunction, switcherContent, isActive, isListNotEmpty, pathname }:
        CategorySwitcherProps
) => {

    const switcherElement = (
        pathname ?
            <SwitcherAsLink
                onClick={switchCategoryFunction}
                to={pathname}
                $active={isActive}
            >
                {switcherContent}
            </SwitcherAsLink> :
            <Switcher
                onClick={switchCategoryFunction}
                $active={isActive}
            >
                {switcherContent}
            </Switcher>
    )

    return (
        <>
            {
                isListNotEmpty && (
                    switcherElement
                )
            }
        </>
    );
};