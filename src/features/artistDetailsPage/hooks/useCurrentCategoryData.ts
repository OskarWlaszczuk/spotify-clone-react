import { useState } from "react";
import { CategoryData } from "../../../common/Interfaces/CategoryData";

export const useCurrentCategoryData = (initialCategoryData: CategoryData) => {

    const [currentCategoryData, setCurrentCategoryData] = useState<CategoryData>({
        categoryName: initialCategoryData.categoryName,
        categoryView: initialCategoryData.categoryView
    });

    return { currentCategoryData, setCurrentCategoryData };
};