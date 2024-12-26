import {Switcher} from "./styled";

interface CategorySwitcherProps {
    switchCategoryFunction: () => void;
    switcherContent: string;
    isActive: boolean;
    isListNotEmpty: boolean;
};

export const CategorySwitcher = (
    {switchCategoryFunction, switcherContent, isActive, isListNotEmpty}:
    CategorySwitcherProps
) => {

    return (
        <>
            {
                isListNotEmpty && (
                    <Switcher
                        onClick={switchCategoryFunction}
                        $active={isActive}
                    >
                        {switcherContent}
                    </Switcher>
                )
            }
        </>
    );
};