import { isMatch } from "../../functions/isMatch"
import { CategorySwitcher } from "./CategorySwitcher"
import { isNotEmpty } from "../../functions/isNotEmpty";
import { CategoryData } from "../../Interfaces/CategoryData";
import { CategoryConfig } from "./CategoryConfig";
import { CategoryName } from "../../Types/CategoryName";

type SetCurrentCategoryDataFunction = ({ categoryName, categoryView }: CategoryData) => void

interface CategoriesSwitchersSection {
    categoriesConfigs: CategoryConfig[],
    setCurrentCategoryData: SetCurrentCategoryDataFunction,
    currentCategory: CategoryName;
    link?:string;
}

export const CategoriesSwitchersSection = (
    { categoriesConfigs, setCurrentCategoryData, currentCategory: targetCategory, link }: CategoriesSwitchersSection
) => {
    return (
        <>
            {
                categoriesConfigs.map(({ categoryView, categoryName, categorySwitcherContent }) => (
                    <CategorySwitcher
                        isListNotEmpty={isNotEmpty(categoryView)}
                        switchCategoryFunction={() => setCurrentCategoryData({
                            categoryName,
                            categoryView,
                        })}
                        switcherContent={categorySwitcherContent}
                        isActive={isMatch(categoryName, targetCategory)}
                        link={link}
                    />
                ))
            }
        </>
    )
}