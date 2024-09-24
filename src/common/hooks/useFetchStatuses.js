import { initial, loading, success, error } from "../constants/fetchStatuses";
import { areAllDatasExists } from "../functions/areAllDatasExists";
import { checkFetchStatuses } from "../functions/checkFetchStatuses";

export const useFetchStatuses = (fetchStatuses = [], datas = []) => {
    const isInitial = checkFetchStatuses(fetchStatuses, initial);
    const isLoading = checkFetchStatuses(fetchStatuses, loading);
    const isError = checkFetchStatuses(fetchStatuses, error);
    const isSucces = (checkFetchStatuses(fetchStatuses, success, true) && areAllDatasExists(datas));

    return { isInitial, isLoading, isError, isSucces };
};