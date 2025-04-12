import { useFetchAPI } from "../../../common/hooks/useFetchAPI";
import { newReleasesActions, newReleasesSelectors } from "../../../common/slices/newReleasesSlice";
import { facetAllCategory } from "../constants/facetCategories";

export const useFetchNewReleases = (facetType) => {
    const endpoint = "browse/new-releases";
    const fetchCondition = facetType === facetAllCategory;

    const { APIFetchStatus, APIData } = useFetchAPI({
        actions: newReleasesActions,
        selectors: newReleasesSelectors,
        endpoint,
        fetchCondition,
    });

    const newReleases = {
        list: APIData?.albums.items,
        status: APIFetchStatus
    };

    return newReleases;
};