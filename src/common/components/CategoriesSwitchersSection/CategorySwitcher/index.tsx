import { Switcher, SwitcherAsLink } from "./styled";

interface CategorySwitcherProps {
    switchCategoryFunction: () => void;
    switcherContent: string;
    isActive: boolean;
    isListNotEmpty: boolean;
    link?: string;
};

export const CategorySwitcher = (
    { switchCategoryFunction, switcherContent, isActive, isListNotEmpty, link }:
        CategorySwitcherProps
) => {

    const switcherElement = (
        link ?
            <SwitcherAsLink
                onClick={switchCategoryFunction}
                to={link}
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