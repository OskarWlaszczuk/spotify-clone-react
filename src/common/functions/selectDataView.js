import { findMatchingValueByKey } from "./findMatchingValueByKey";

export const selectDataView = (dataOptions, type) => {
    const selectedDataView = findMatchingValueByKey(dataOptions, type);

    const selectedList = selectedDataView?.value;
    const selectedTitle = selectedDataView?.title;
    const isArtistsList = selectedDataView?.isArtistsList;

    return { selectedList, selectedTitle, isArtistsList };
}