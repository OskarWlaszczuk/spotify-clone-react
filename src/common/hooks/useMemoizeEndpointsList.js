import { useMemo } from "react";

export const useMemoizeEndpointsList = (endpoint, dependencies) => {
    const memoizedEdnpoint = useMemo(
        () => [{ endpoint }],
        [...dependencies, endpoint]
    );

    return memoizedEdnpoint
};