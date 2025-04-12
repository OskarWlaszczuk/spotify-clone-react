import { useState } from "react";
import { CategoryData } from "../../../common/Interfaces/CategoryData";

export const useCurrentCategoryData = (initialCategoryData: CategoryData) => {

    const [currentCategoryData, setCurrentCategoryData] = useState<CategoryData>({
        releaseType: initialCategoryData.releaseType,
        releaseList: initialCategoryData.releaseList,
    });

    return { currentCategoryData, setCurrentCategoryData };
};