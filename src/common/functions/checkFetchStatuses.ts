export const checkFetchStatuses = (fetchStatuses: string[], targetStatus: string, matchAll: boolean = false): boolean => {

    return (
        matchAll ?
            fetchStatuses.every(fetchState => fetchState === targetStatus)
            : fetchStatuses.some(fetchState => fetchState === targetStatus)
    );
};