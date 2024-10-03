import { useState } from "react";

export const useCurrentCategoryData = (initialCategoryData) => {

    const [currentCategoryData, setCurrentCategoryData] = useState({ category: initialCategoryData.key, list: initialCategoryData.value });

    return { currentCategoryData, setCurrentCategoryData };
};