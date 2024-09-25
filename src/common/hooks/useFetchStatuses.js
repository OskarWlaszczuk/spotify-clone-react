import { initial, loading, success, error } from "../constants/fetchStatuses";
import { checkFetchStatuses } from "../functions/checkFetchStatuses";

export const useFetchStatuses = (fetchStatuses = []) => {
    const isInitial = checkFetchStatuses(fetchStatuses, initial);
    const isLoading = checkFetchStatuses(fetchStatuses, loading);
    const isError = checkFetchStatuses(fetchStatuses, error);
    const isSucces = (checkFetchStatuses(fetchStatuses, success, true));

    return { isInitial, isLoading, isError, isSucces };
};