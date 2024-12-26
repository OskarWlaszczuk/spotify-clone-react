import {isMatch} from "../../functions/isMatch"
import {CategorySwitcher} from "./CategorySwitcher"
import {isNotEmpty} from "../../functions/isNotEmpty";
import {ImagesDataList} from "../../Interfaces/ImageCollection";

interface ListData extends ImagesDataList {
    name: string;
    id: string;
}

interface CategoryDataInput {
    category: string;
    listToDisplay: ListData[]
}

type SetCurrentCategoryDataFunction = ({category, listToDisplay}: CategoryDataInput) => void

interface CategoryData {
    listToDisplay: ListData[],
    category: string;
    categorySwitcherContent: string;
}

interface CategoriesSwitchersSection {
    categoriesDataList: CategoryData[],
    setCurrentCategoryData: SetCurrentCategoryDataFunction,
    targetCategory: string;
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