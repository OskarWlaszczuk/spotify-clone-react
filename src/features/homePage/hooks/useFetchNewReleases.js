import { useFetch } from "../../../common/hooks/useFetchAPI";
import { newReleasesActions, newReleasesSelectors } from "../../../common/slices/newReleasesSlice";
import { facetAllCategory } from "../constants/facetCategories";

export const useFetchNewReleases = (facetType) => {
    const endpoint = "browse/new-releases";
    const fetchCondition = facetType === facetAllCategory;

    const { APIFetchStatus: newReleasesStatus, APIData } = useFetch({
        actions: newReleasesActions,
        selectors: newReleasesSelectors,
        endpoint,
        fetchCondition:facetType === facetAllCategory,
    });

    const newReleases = APIData?.albums.items;

    return { newReleasesStatus, newReleases };
};