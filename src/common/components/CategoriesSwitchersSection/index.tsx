import {isMatch} from "../../functions/isMatch"
import {CategorySwitcher} from "./CategorySwitcher"
import {isNotEmpty} from "../../functions/isNotEmpty";
import {ReleaseCategory} from "../../Types/ReleaseCategory";
import {AlbumItem} from "../../Interfaces/ListItem";

interface CategoryDataInput {
    category: string;
    listToDisplay: AlbumItem[]
}

type SetCurrentCategoryDataFunction = ({category, listToDisplay}: CategoryDataInput) => void

interface CategoryData {
    listToDisplay: AlbumItem[],
    category: ReleaseCategory;
    categorySwitcherContent: string;
}

interface CategoriesSwitchersSection {
    categoriesDataList: CategoryData[],
    setCurrentCategoryData: SetCurrentCategoryDataFunction,
    targetCategory: ReleaseCategory;
}

export const CategoriesSwitchersSection = (
    {categoriesDataList, setCurrentCategoryData, targetCategory}: CategoriesSwitchersSection
) => {
    return (
        <>
            {
                categoriesDataList.map(({listToDisplay, category, categorySwitcherContent}) => (
                    <CategorySwitcher
                        isListNotEmpty={isNotEmpty(listToDisplay)}
                        switchCategoryFunction={() => setCurrentCategoryData({
                            category,
                            listToDisplay,
                        })}
                        switcherContent={categorySwitcherContent}
                        isActive={isMatch(category, targetCategory)}
                    />
                ))
            }
        </>
    )
}