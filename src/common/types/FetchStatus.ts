import { initial, loading, success, error } from "../constants/fetchStatuses"

export type FetchStatus = typeof initial | typeof loading | typeof success | typeof error;