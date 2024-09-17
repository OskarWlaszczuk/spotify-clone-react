export const checkFetchStatuses = (fetchStatuses, targetStatus, matchAll = false) => {

    return (
        matchAll ?
            fetchStatuses.every(fetchState => fetchState === targetStatus)
            : fetchStatuses.some(fetchState => fetchState === targetStatus)
    );
};