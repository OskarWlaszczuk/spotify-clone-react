import { isMatch } from "../../functions/isMatch"
import { CategorySwitcher } from "./CategorySwitcher"
import { isNotEmpty } from "../../functions/isNotEmpty";
import { CategoryData } from "../../Interfaces/CategoryData";
import { CategoryConfig } from "./CategoryConfig";
import { CategoryName } from "../../Types/CategoryName";

type SetCurrentCategoryDataFunction = ({ releaseType, releaseList }: CategoryData) => void

interface CategoriesSwitchersSection {
    categoriesConfigs: CategoryConfig[],
    setCurrentCategoryData: SetCurrentCategoryDataFunction,
    currentCategory: CategoryName;
}

export const CategoriesSwitchersSection = (
    { categoriesConfigs, setCurrentCategoryData, currentCategory: targetCategory }: CategoriesSwitchersSection
) => {
    return (
        <>
            {
                categoriesConfigs.map(({ releaseList, releaseType, switcherButtonContent, pathname }) => (
                    <CategorySwitcher
                        isListNotEmpty={isNotEmpty(releaseList)}
                        switchCategoryFunction={() => setCurrentCategoryData({
                            releaseType,
                            releaseList,
                        })}
                        switcherContent={switcherButtonContent}
                        isActive={isMatch(releaseType, targetCategory)}
                        pathname={pathname}
                    />
                ))
            }
        </>
    )
}