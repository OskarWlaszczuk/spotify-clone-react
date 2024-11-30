import { useEffect, useState } from "react";
import { findMatchingValueByKey } from "../functions/findMatchingValueByKey";

export const useMatchFullListDataByType = (fullListsDataOptions, type) => {

    const [fullListData, setFullListData] = useState({
        fullListContent: undefined,
        fullListTitle: undefined,
        isFullListArtistsList: undefined,
    });

    useEffect(() => {
        const matchedFullListDataByType = findMatchingValueByKey(fullListsDataOptions, type);
        
        setFullListData({
            fullListContent: matchedFullListDataByType?.value,
            fullListTitle: matchedFullListDataByType?.title,
            isFullListArtistsList: matchedFullListDataByType?.isArtistsList,
        })
    }, [type]);

    const { fullListContent, fullListTitle, isFullListArtistsList } = fullListData;
    return { fullListContent, fullListTitle, isFullListArtistsList };
};